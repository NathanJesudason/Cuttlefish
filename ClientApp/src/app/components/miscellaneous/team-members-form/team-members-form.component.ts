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

import { MessageService } from 'primeng/api';

import { TeamMember } from 'src/types/team-member.model';
import { TeamMemberService } from 'src/app/services/team-member/team-member.service';

@Component({
  selector: 'app-team-members-form',
  templateUrl: './team-members-form.component.html',
  styles: [
  ],
  providers: [MessageService]
})
export class TeamMembersFormComponent implements OnInit {

  constructor(
    public service: TeamMemberService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    if(this.service.teamMemberData.id == 0){
      this.insertRecord(form)
    }
    else{
      this.updateRecord(form)
    }
  }

  insertRecord(form: NgForm){
    this.service.postTeamMember().subscribe({
      next: res => {
        this.resetForm(form)
        this.service.refreshList(this.messageService)
      },
      error: err => {
        this.messageService.add({severity: 'error', summary: err.message});
      },
    });
  }

  updateRecord(form: NgForm){
    this.service.putTeamMember().subscribe({
      next: res => {
        this.resetForm(form)
        this.service.refreshList(this.messageService)
      },
      error: err => {
        this.messageService.add({severity: 'error', summary: err.message});
      },
    });
  }

  resetForm(form: NgForm){
    form.form.reset()
    this.service.teamMemberData = new TeamMember()
  }

  
}
