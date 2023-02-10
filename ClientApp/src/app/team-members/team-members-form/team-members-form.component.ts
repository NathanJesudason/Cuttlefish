import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TeamMember } from 'src/app/shared/team-member.model';
import { TeamMemberService } from 'src/app/shared/team-member.service';

@Component({
  selector: 'app-team-members-form',
  templateUrl: './team-members-form.component.html',
  styles: [
  ]
})
export class TeamMembersFormComponent implements OnInit {

  constructor(public service: TeamMemberService) { }

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
    this.service.postTeamMember().subscribe(
      res=>{
        this.resetForm(form)
        this.service.refreshList()
        console.log(res, "Submitted")
    },
    err => {console.log(err)})
  }

  updateRecord(form: NgForm){
    this.service.putTeamMember().subscribe(
      res=>{
        this.resetForm(form)
        this.service.refreshList()
        console.log(res, "Submitted")
    },
    err => {console.log(err)})
  }

  resetForm(form: NgForm){
    form.form.reset()
    this.service.teamMemberData = new TeamMember()
  }

  
}
