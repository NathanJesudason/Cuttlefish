import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EditAvatarModalComponent } from '../../modals/edit-avatar-modal/edit-avatar-modal.component';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AvatarService } from 'src/app/services/team-member/avatar.service';
import { TeamMember } from 'src/types/team-member.model';
import { TeamMemberService } from 'src/app/services/team-member/team-member.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private userService: UserService, private authService: AuthService, private avatarService: AvatarService, private teammemberService: TeamMemberService, private messageService: MessageService) { }

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
        console.log('teammember: ', teammember)
        this.name = teammember.name
        this.usernameForm = teammember.username
        this.email = teammember.email
      },
      error: () => console.log('Error getting username..')
    })


    
    // this.userService.getUserName().subscribe({
    //   next: (username: string) => {
    //     // this.username = username || this.authService.getUsernameFromToken();
    //   },
    //   error: err => console.log("Error getting username: ", err)
    // });


  }

  loadAvatar(){
    if(this.username){
      this.avatarService.loadAvatar(this.username).subscribe({
        next: res=> {
          let avatar
          let options = res as TeamMember
          console.log('options: ', options)
          if (!options.avatar){
            return
          }else{
            
          // check it it's an object
          // if (options.avatar[0] == "{"){
          //   let options2 = JSON.parse(options.avatar)
          //   console.log("Avatar2: ", options.avatar)
            
          //   avatar = createAvatar(funEmoji,
          //     options2  
          //   )
          // }
          // else{
          //   avatar = createAvatar(funEmoji,
          //     {
          //       seed: options.avatar
          //     }
          //     )
          //   }
          
          // avatar.toDataUri().then(
          //   res => {this.imageSrc = res 
          //     console.log('avatar', this.imageSrc)},
          //   err => console.log('err', err)
          //   )
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
        // change the UI 
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
    console.log(nameToEdit)
    console.log('username: ', this.username)

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

  // editUsername(usernameToEdit: string){
  //   console.log(usernameToEdit)
  //   let t = {username: usernameToEdit}
  //   this.teammemberService.updateTeammember(this.username, t).subscribe({
  //     next: res => {
  //       // make calls to the auth and user services
  //       let token = {token: ""}
  //       token = res as typeof token
  //       this.authService.storeToken(token.token)
  //       this.userService.setUserName(this.authService.decodedToken().name)
  //       this.username = this.authService.decodedToken().name
  //     },
  //     error: err => {
  //       console.log('err', err)
  //     }
  //   })
  //   this.closeEdit()
  // }

  editEmail(emailToEdit: string){
    console.log(emailToEdit)
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

  editAccountInfo(valueToEdit: string, field: string){


    this.teammemberService.getTeamMemberByUsername(this.username).subscribe({
      next: res => {
        let user = res as TeamMember
        let t: any = {}

        
        


        // this.teammemberService.updateTeammember(this.username, t).subscribe({
        //   next: res => {
        //     console.log('res: ', res)
            
        //   },
        //   error: (err) =>{
        //     console.log(err)
        //   }
        // })

      },
      error: err=>{
        console.log(err)
      }
    })

    // call the api endpoint
    // let teammember= {
    //   name: this.name,
    //   username: this.usernameForm,      
    //   email: this.email
    // }
    this.closeEdit()
  }

  closeEdit(){
    this.hidden = false
    this.disabled = true
    this.btnAction = "Edit"
    this.btnColor = ""
  }

}
