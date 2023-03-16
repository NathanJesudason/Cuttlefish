import {
  Component,
  OnInit
} from '@angular/core';

import { AuthService } from 'src/app/services/auth/auth.service';
import { TeamMemberToProjectService } from 'src/app/services/team-member-to-project/team-member-to-project.service';
import { TeamMemberService } from 'src/app/services/team-member/team-member.service';
import { UserService } from 'src/app/services/user/user.service';
import { TeamMemberToProject } from 'src/types/team-member-to-project';

import { TeamMember } from 'src/types/team-member.model';

@Component({
  selector: 'teammembers',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.css']
})
export class TeamMembersComponent implements OnInit {

  constructor(public service: TeamMemberService, private auth: AuthService, private user: UserService, public teammemberToProjectService: TeamMemberToProjectService) { }

  public role!: string
  public list!: TeamMemberToProject[]
  public listofProjects: number[] = []
  public listofProjects2: number[] = []
  public listofMembers: number[] = []
  public teamMembersToProject!: TeamMemberToProject

  ngOnInit(): void {
    if(this.auth.isLoggedIn())
      this.service.refreshList()

      // check which role the user is and display certain things in the UI. 
    this.user.getRole().subscribe(value =>
      {
        const rolefromToken = this.auth.getRoleFromToken()
        this.role = value || rolefromToken
        
      })
      this.populateTable()
      
  }

  
  
  populateTable(){
    //stopped at getting data for project name and team member by it and displaying it on the table. 
    this.teammemberToProjectService.refreshList().subscribe(
      res =>{
          this.teammemberToProjectService.teamMemberToProjectList = res as TeamMemberToProject[]
          this.list = this.teammemberToProjectService.teamMemberToProjectList
          console.log("this.listtt", this.list)

          // assign two arrays: one for projectIDs and one for teammemberIDs
          this.teammemberToProjectService.teamMemberToProjectList.map(
            list =>{
              this.listofProjects.push(list.projectID)
              this.listofMembers.push(list.teamMemberID)
            }
          )
            // remove duplicate values
          this.listofProjects = [...new Set(this.listofProjects)]
          this.listofMembers = [...new Set(this.listofMembers)]

          
          console.log("this.list", this.list, this.listofProjects2, this.listofMembers)
          
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
