import {
  Component,
  OnInit
} from '@angular/core';

import { AuthService } from 'src/app/services/auth/auth.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { TeamMemberToProjectService } from 'src/app/services/team-member-to-project/team-member-to-project.service';
import { TeamMemberService } from 'src/app/services/team-member/team-member.service';
import { UserService } from 'src/app/services/user/user.service';
import { ProjectData } from 'src/types/project';
import { TeamMemberToProject } from 'src/types/team-member-to-project';

import { TeamMember } from 'src/types/team-member.model';

@Component({
  selector: 'teammembers',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.css']
})
export class TeamMembersComponent implements OnInit {

  constructor(public service: TeamMemberService, private auth: AuthService, private user: UserService, private projectsApi: ProjectService, public teammemberToProjectService: TeamMemberToProjectService) { }

  public role!: string
  public listProjectsToTeamMembers!: TeamMemberToProject[]

  public listofProjects!: ProjectData[]

  public listofMembers!: TeamMember[]

  public teamMembersToProject!: TeamMemberToProject

  ngOnInit(): void {
    if(this.auth.isLoggedIn())
      this.service.refreshList()
      this.projectsApi.getAllProjects().subscribe(
        res=> this.listofProjects = res
      )
      this.service.getTeamMember().subscribe(
        res=> this.listofMembers = res as TeamMember[]
      )
      

      // check which role the user is and display certain things in the UI. 
    this.user.getRole().subscribe(value =>
      {
        const rolefromToken = this.auth.getRoleFromToken()
        this.role = value || rolefromToken
        
      })
      this.populateTable()
      
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
    //stopped at getting data for project name and team member by it and displaying it on the table. 
    this.teammemberToProjectService.refreshList().subscribe(
      res =>{
          this.listProjectsToTeamMembers = res as TeamMemberToProject[]


          
      }
    )
  }
   


  onDelete(id:number){
    if(confirm('Delete this team member?')){
      this.service.deleteTeamMember(id).subscribe(
       ( res) => {
          this.service.refreshList()
          console.log("Team member deleted")
        }
      ,
      err => {console.log(err)}
      )
    }
  }
  

}
