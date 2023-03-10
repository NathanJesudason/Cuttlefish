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
  // public teamMembersToProjectList!: TeamMemberToProject[]
  // public teamMembersToProject!: TeamMemberToProject

  ngOnInit(): void {
    if(this.auth.isLoggedIn())
      this.service.refreshList()

      // check which role the user is and display certain things in the UI. 
    this.user.getRole().subscribe(value =>
      {
        const rolefromToken = this.auth.getRoleFromToken()
        this.role = value || rolefromToken
        
      })

    this.teammemberToProjectService.refreshList()
  }

  populateForm(selectedItem: TeamMember){
    this.service.teamMemberData = Object.assign({}, selectedItem)
  }

  populateTable(){
    // this.service.getTeamMemberByID(this.teammemberToProjectService.)
    //stopped at getting data for project name and team member by it and displaying it on the table. 
  }
   


  onDelete(id:number){
    if(confirm('Delete this team member?')){
      this.service.deleteTeamMember(id).subscribe(
        res => {
          this.service.refreshList()
          console.log("Team member deleted")
        }
      ,
      err => {console.log(err)}
      )
    }
  }
  

}
