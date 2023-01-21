import { Component, OnInit } from '@angular/core';
import { TeamMember } from '../shared/team-member.model';
import { TeamMemberService } from '../shared/team-member.service';

@Component({
  selector: 'teammembers',
  templateUrl: './team-members.component.html',
  styles: [
  ]
})
export class TeamMembersComponent implements OnInit {

  constructor(public service: TeamMemberService) { }

  ngOnInit(): void {
    this.service.refreshList()
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
