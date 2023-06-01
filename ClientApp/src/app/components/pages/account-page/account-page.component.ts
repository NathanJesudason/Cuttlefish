import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EditAvatarModalComponent } from '../../modals/edit-avatar-modal/edit-avatar-modal.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AvatarService } from 'src/app/services/team-member/avatar.service';
import { TeamMember } from 'src/types/team-member.model';
import { TeamMemberService } from 'src/app/services/team-member/team-member.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css'],
  providers: [MessageService],
})
export class AccountPageComponent implements OnInit {

  @ViewChild('editAvatarModal') editAvatarModal!: ElementRef<EditAvatarModalComponent>;

  usernameForm: string = ""
  name: string = ""
  email: string = "email"
  disabled = true
  hidden = false
  btnAction: string = "Edit"
  btnColor: string = ""
  public imageSrc = `` 
  username:string = ""
  teammember!: TeamMember

  constructor(private authService: AuthService, private avatarService: AvatarService, private teammemberService: TeamMemberService) { }

  ngOnInit(): void {
    this.getUsername()
    this.loadAvatar()
  }

  getUsername(){
    this.username = this.authService.getUsernameFromToken()
    this.teammemberService.getTeamMemberByUsername(this.username).subscribe({
      next: (res) => {
        this.teammember = res as TeamMember
        let teammember = res as TeamMember
        this.name = teammember.name
        this.usernameForm = teammember.username
        this.email = teammember.email
      },
      error: (err) => console.log('Error getting username..', err)
    })
  }

  loadAvatar(){
    if(this.username){
      this.avatarService.loadAvatar(this.username).subscribe({
        next: res=> {
          let options = res as TeamMember
          if (options.avatar){
            this.imageSrc = options.avatar
          }
        },
        error: err=> {console.log("Error getting avatar: ", err)}
      })
    }
  }

  openAvatarModal(){
    (this.editAvatarModal as any).showEditAvatarModal()
  }

  changeButton(){
    // change the button text  
    if (this.btnAction == "Edit"){
      this.btnAction = "Save"
      this.hidden = true
      this.disabled = false
      this.btnColor = "p-button-success"
    }
    else{
      this.btnAction = "Edit"
      this.hidden = false
      this.disabled = true
      this.btnColor = ""
    }
  }


  editName(nameToEdit: string){
    let t = {name: nameToEdit}
    this.teammemberService.updateTeammember(this.username, t).subscribe({
      next: res => {
        console.log('res', res)
      },
      error: err => {
        console.log('err', err)
      }
    })
    this.closeEdit()
  }

  editEmail(emailToEdit: string){
    let t = {email: emailToEdit}
    this.teammemberService.updateTeammember(this.username, t).subscribe({
      next: res => {
        console.log('res', res)
      },
      error: err => {
        console.log('error: ', err)
      }
    })
    this.closeEdit()
  }

  closeEdit(){
    this.hidden = false
    this.disabled = true
    this.btnAction = "Edit"
    this.btnColor = ""
  }
}
