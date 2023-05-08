import {
  Component,
  OnInit
} from '@angular/core';

import { MessageService } from 'primeng/api';

import { AuthService } from 'src/app/services/auth/auth.service';
import { TeamMemberService } from 'src/app/services/team-member/team-member.service';
import { UserService } from 'src/app/services/user/user.service';

import { TeamMember } from 'src/types/team-member.model';

@Component({
  selector: 'teammembers',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.css'],
  providers: [MessageService],
})
export class TeamMembersComponent implements OnInit {

  constructor(
    public service: TeamMemberService,
    private auth: AuthService,
    private user: UserService,
    private messageService: MessageService,
  ) { }

  public role!: string

  ngOnInit(): void {
    if(this.auth.isLoggedIn())
      this.service.refreshList(this.messageService)

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
      this.service.deleteTeamMember(id).subscribe({
        next: res => {
          this.service.refreshList(this.messageService)
        },
        error: err => {
          this.messageService.add({severity: 'error', summary: err.message});
        },
      });
    }
  }
  

}
