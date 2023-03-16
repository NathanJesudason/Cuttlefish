import {
  Component,
  OnInit
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { TeamMember } from 'src/types/team-member.model';
import { TeamMemberService } from 'src/app/services/team-member/team-member.service';
import { ProjectData } from 'src/types/project';
import { ServerApi } from 'src/app/services/server-api/server-api.service';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TeamMemberToProjectService } from 'src/app/services/team-member-to-project/team-member-to-project.service';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-team-members-form',
  templateUrl: './team-members-form.component.html',
  styles: [],
  providers: [MessageService]
})
export class TeamMembersFormComponent implements OnInit {

  public projects!: ProjectData[]
  public selectedProject!: ProjectData

  teamMember!: TeamMember 

  public username!: string
  public role!: string

  public createUserRole!: string
  
  

  constructor(public teamMemberService: TeamMemberService, private serverApi: ServerApi, private user: UserService, private auth: AuthService,
    private teammemberToProject: TeamMemberToProjectService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.projects = this.serverApi.getAllProjects()


    this.user.getRole().subscribe(value =>
      {
        const rolefromToken = this.auth.getRoleFromToken()
        this.role = value || rolefromToken
        
      })

    // const projectMenuItems = this.projects.map(project => {
    //   return {
    //     icon: 'pi pi-briefcase',
    //     label: `${project.id}: ${project.name}`,
    //     routerLink: ['/project', project.id],
    //   } as MenuItem;
    // });
    // this.menuItems[0].items = projectMenuItems;
  }
  


  onSubmit(form: NgForm){
    if(this.teamMemberService.teamMemberData.id == 0){
      console.log("project", this.projects)
      console.log("form", form.value)
      this.addTeamMemberToProject(form)
      // this.insertRecord(form)
    }
    // else{
      // this.updateRecord(form)
    // }
  }

  addTeamMemberToProject(form: NgForm){
    this.teamMemberService.getTeamMemberByUsername(form.value.username).subscribe(
      res =>{
        console.log("res",res)
        this.teamMember = res as TeamMember
        this.teammemberToProject.teamMemberToProject = {
          projectID: form.value.project.id,
          teamMemberID: this.teamMember.id
        }
        this.teammemberToProject.postTeamMemberToProject().subscribe(
          res =>{
            console.log("res",res)
            this.messageService.add({severity: 'success', summary: 'Team member added'})
          },
          err => {
            if(err.status === 400){
              this.messageService.add({severity: 'error', summary: 'Project does not exist'})
            }
            console.log(err)}
        )
      },
      err => {
        if(err.status === 404){
          this.messageService.add({severity: 'error', summary: 'Username does not exist'})
        }
        console.log("Error: ",err)}
    )
  }

  insertRecord(form: NgForm){
    this.teamMemberService.postTeamMember().subscribe(
      res=>{
        this.resetForm(form)
        this.teamMemberService.refreshList()
        console.log(res, "Submitted")
    },
    err => {console.log(err)})
  }

  updateRecord(form: NgForm){
    this.teamMemberService.putTeamMember().subscribe(
      res=>{
        this.resetForm(form)
        this.teamMemberService.refreshList()
        console.log(res, "Submitted")
    },
    err => {console.log(err)})
  }

  resetForm(form: NgForm){
    form.form.reset()
    this.teamMemberService.teamMemberData = new TeamMember()
  }

  
}
