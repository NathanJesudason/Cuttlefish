import {
  Component,
  OnInit
} from '@angular/core';

import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { TeamMemberToProjectService } from 'src/app/services/team-member-to-project/team-member-to-project.service';
import { TeamMemberService } from 'src/app/services/team-member/team-member.service';
import { UserService } from 'src/app/services/user/user.service';

import { ProjectData } from 'src/types/project';
import { GetTeamMemberToProject, TeamMemberToProject } from 'src/types/team-member-to-project';
import { TeamMember } from 'src/types/team-member.model';


@Component({
  selector: 'teammembers',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class TeamMembersComponent implements OnInit {

  constructor(public TeamMemberService: TeamMemberService, private auth: AuthService, 
    private user: UserService, private projectsApi: ProjectService, 
    public teammemberToProjectService: TeamMemberToProjectService, 
    private confirmationService: ConfirmationService, private messageService: MessageService) 
    { }

  public role!: string
  public listProjectsToTeamMembers!: TeamMemberToProject[]

  public listofProjects!: ProjectData[]

  public listofMembers!: TeamMember[]

  public teamMembersToProject!: TeamMemberToProject

  showDelete = false
  editOrCancel = "Edit"

  avatar: string = ""

  ngOnInit(): void {
    if(this.auth.isLoggedIn())
    {
      this.TeamMemberService.refreshList()

      this.projectsApi.getAllProjects().subscribe({
        next: res=> this.listofProjects = res,
        error: err => console.log("Error occured:", err)
      }
      )

      this.loadTeamMembers()
      
      this.user.getRole().subscribe(value =>
        {
          const rolefromToken = this.auth.getRoleFromToken()
          this.role = value || rolefromToken
        })
        this.populateTable()
    }
  }

  editMembers(){
    console.log("edit members:", this.showDelete)
    this.showDelete = !this.showDelete
    if (this.editOrCancel === "Edit")
      this.editOrCancel = "Cancel"
    else
      this.editOrCancel = "Edit"
  }

 
      
  loadTeamMembers(){
    this.TeamMemberService.getTeamMember().subscribe({
      next: res=> this.listofMembers = res as TeamMember[],
      error: err => console.log("Error occured:", err)
    }
    )
  }

  userInProject(projId: number, teamMemberId: number ){

    
    var inProject = false
    var teammember: any
    for(teammember in this.listProjectsToTeamMembers){
      if (this.listProjectsToTeamMembers[teammember].projectID === projId && 
        this.listProjectsToTeamMembers[teammember].teamMemberID === teamMemberId)
        {
          inProject = true
        }
    }

    this.teammemberToProjectService.refreshList()
    return inProject
  }
  
  populateTable(){
    this.teammemberToProjectService.refreshList().subscribe({
      next: res =>{
        this.listProjectsToTeamMembers = res as TeamMemberToProject[]
      },
      error: err => console.log("Error occured:", err)
    })
  }
   


  // make query to get id of the teammembertoprojects  
  //delete teammember from project using that id
  onDelete(event: Event, teamMember: TeamMember, project: ProjectData){
    
    console.log("project :", project)

    this.confirmationService.confirm({
      target: event.target || undefined,
      message: `Are you sure you want to delete ${(teamMember.username).toUpperCase()} from ${(project.name).toUpperCase()}?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.TeamMemberService.getTeamMemberFromProject(teamMember.id, project.id).subscribe({
          next: res =>{
            let id = res as GetTeamMemberToProject
            console.log('id to delete', id)
            this.TeamMemberService.deleteTeamMemberFromProject(id.id).subscribe({
              next: () => this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Team member has been deleted from project.' }),
              error: err=> this.messageService.add({ severity: 'error', summary: 'Error occured: ', detail: `${err}` })
            })
          },
          error: err=> this.messageService.add({ severity: 'error', summary: 'Error occured: ', detail: `${err}` })
        })
        this.TeamMemberService.refreshList()
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Canceled', detail: 'Canceled deletion.' })
      }
    })
  }

  showRole(username: string){
    let user = this.listofMembers.map(member => member.username).indexOf(username)
    this.avatar = this.listofMembers[user].avatar
    return this.listofMembers[user].roles
  }

}
