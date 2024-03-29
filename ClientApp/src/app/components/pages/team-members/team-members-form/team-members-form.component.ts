/*
* Component Folder: team-members-form
* Component Name: TeamMembersFormComponent
* Description:
*     The team-members-form component is displayed on the team members page
*   and it is used to add members to the team. The form input is as follows:
*   Team Member Name/Username, Password, Email, and Role. The form is reset
*   after a successful submission.
*/

import {
  Component,
  OnInit
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { TeamMember } from 'src/types/team-member.model';
import { TeamMemberService } from 'src/app/services/team-member/team-member.service';
import { ProjectData } from 'src/types/project';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TeamMemberToProjectService } from 'src/app/services/team-member-to-project/team-member-to-project.service';
import { MessageService } from 'primeng/api';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-team-members-form',
  templateUrl: './team-members-form.component.html',
  styleUrls: ['./team-members-form.component.css'],
  providers: [MessageService]
})
export class TeamMembersFormComponent implements OnInit {

  public projects!: ProjectData[]
  public selectedProject!: ProjectData
  teamMember!: TeamMember 
  public username!: string
  public role!: string
  public createUserRole!: string

  constructor(public teamMemberService: TeamMemberService, private projectsApi: ProjectService, private user: UserService, private auth: AuthService,
    private teammemberToProject: TeamMemberToProjectService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.projectsApi.getAllProjects().subscribe({
      next: res => this.projects = res,
      error: err => this.messageService.add({severity: 'error', summary: `Error occured ${err}. Could not retrieve all projects.`})
    })

    this.user.getRole().subscribe(value =>{
      const rolefromToken = this.auth.getRoleFromToken()
      this.role = value || rolefromToken
    })
  }

  onSubmit(form: NgForm){
    if(this.teamMemberService.teamMemberData.id == 0)
      this.addTeamMemberToProject(form)
  }

  addTeamMemberToProject(form: NgForm){
    this.teamMemberService.getTeamMemberByUsername(form.value.username).subscribe({
      next: res =>{
        this.teamMember = res as TeamMember
        this.teammemberToProject.teamMemberToProject = {
          projectID: form.value.project.id,
          teamMemberID: this.teamMember.id
        }
        this.teammemberToProject.postTeamMemberToProject().subscribe({
          next: () =>{
            this.messageService.add({severity: 'success', summary: 'Team member added'})
          },
          error: err => {
            if(err.status === 400){
              this.messageService.add({severity: 'error', summary: 'Project does not exist'})
            }
            if(err.status === 409){
              this.messageService.add({severity: 'error', summary: 'Team member already exists on that project!'})
            }
          }
        })
      },
      error: err => {
        if(err.status === 404)
          this.messageService.add({severity: 'error', summary: 'Username does not exist'})
        else
          this.messageService.add({severity: 'error', summary: err})
      }
    })
  }
}
