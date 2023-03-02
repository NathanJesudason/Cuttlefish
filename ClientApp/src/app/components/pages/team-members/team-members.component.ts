import {
  Component,
  OnInit
} from '@angular/core';

import { AuthService } from 'src/app/services/auth/auth.service';
import { TeamMemberService } from 'src/app/services/team-member/team-member.service';
import { UserService } from 'src/app/services/user/user.service';

import { TeamMember } from 'src/types/team-member.model';

@Component({
  selector: 'teammembers',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.css']
})
export class TeamMembersComponent implements OnInit {

  constructor(public service: TeamMemberService, private auth: AuthService, private user: UserService) { }

  public role!: string

  ngOnInit(): void {
    if(this.auth.isLoggedIn())
      this.service.refreshList()

      // check which role the user is and display certain things in the UI. 
    this.user.getRole().subscribe(value =>
      {
        const rolefromToken = this.auth.getRoleFromToken()
        this.role = value || rolefromToken
        
      })
  }

  populateForm(selectedItem: TeamMember){
    this.service.teamMemberData = Object.assign({}, selectedItem)
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
