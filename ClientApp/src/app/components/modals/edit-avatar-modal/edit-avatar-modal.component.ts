import { Component, OnInit } from '@angular/core';
import { funEmoji } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { MessageService } from 'primeng/api';
import { AvatarService } from 'src/app/services/team-member/avatar.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { eyesOptions, mouthOptions } from 'src/types/avatar';
import { TeamMember } from 'src/types/team-member.model';

@Component({
  selector: 'app-edit-avatar-modal',
  templateUrl: './edit-avatar-modal.component.html',
  styleUrls: ['./edit-avatar-modal.component.css'],
  providers: [MessageService],
})
export class EditAvatarModalComponent implements OnInit {

  title: string = "Edit"
  editLabelModalShown: boolean = false;


  // avatars
  //----------------------
  public imageSrc = `` 
  seed = ``
  mouth = "plain"
  eyes = "plain"
  eyeIndex = 0
  mouthIndex = 0
  translateX = 0
  translateY = 0
  backgroundColor = "468dfa"
  backgroundType = "solid"
  options: any
  username:string = ""
  //----------------------
  
  constructor(private avatarService: AvatarService, private userService: UserService, private authService: AuthService, private messageService: MessageService ) { }

  ngOnInit(): void {
  }

  showEditAvatarModal() {
    this.editLabelModalShown = true
    this.loadAvatar()
  }

  closeModal(){
    this.editLabelModalShown = false
  }


  nextMouth(){
    if(this.mouthIndex < mouthOptions.length){
      this.mouthIndex += 1
      this.mouth = mouthOptions[this.mouthIndex]
    }
  }

  prevMouth(){
    if(this.mouthIndex > 0){
      this.mouthIndex -= 1
      this.mouth = mouthOptions[this.mouthIndex]
    }
    
  }

  nextEyes(){
    if(this.eyeIndex < eyesOptions.length){
      this.eyeIndex += 1
      this.eyes = eyesOptions[this.eyeIndex]
    }
  }

  prevEyes(){
    if(this.eyeIndex > 0){
      this.eyeIndex -= 1
      this.eyes = eyesOptions[this.eyeIndex]
    }
  }
  changeColor(color: string){
    if(color.length > 6)
      color = color.substring(1)
    console.log("color ", color)
    this.backgroundColor = color 
  }

  getAvatars(options: any){
    this.options = options
    this.options = JSON.stringify(options)
    //reset the random seed
    this.seed = ""

    let avatar = createAvatar(funEmoji,
        options
    )

    avatar.toDataUri().then(
      res => this.imageSrc = res ,
      err => console.log('err', err)
    )
  }

  getRandomAvatar(){
    let randomString =  Math.random().toString().slice(2,10)
    this.seed = randomString
    let avatar = createAvatar(funEmoji,
      {
        seed: randomString,
        radius: 30
      }
    )

  avatar.toDataUri().then(
    res => this.imageSrc = res ,
    err => console.log('err', err)
  )
  }


  loadAvatar(){
    this.userService.getUserName().subscribe({
      next: (username: string) => {
        this.username = username || this.authService.getUsernameFromToken()
        console.log('username from loadAvatar: ', this.username)
        this.avatarService.loadAvatar(this.username).subscribe({
          next: res=> {
            let options = res as TeamMember
            if (!options.avatar){
              return
            }else{
              this.imageSrc = options.avatar
            }
          }
        })
      },
      error: err => console.log("Error getting username: ", err)
    });
  }

  saveAvatar(){
    // let request: string 
    // if (this.seed != "")
    //   request = this.seed
    // else 
    //   request = this.options
    if (this.username){
      this.avatarService.patchAvatar(this.username, this.imageSrc).subscribe(
        res => {
          this.messageService.add({ severity: 'success', summary: 'Successfully Changed', detail: 'Avatar has been changed.' })
          this.closeModal()
          return res
        },
        err => {
          console.log("error:", err) 
          this.messageService.add({ severity: 'error', summary: 'Failed', detail: `Avatar could not be changed.: ${err} `})
          return err
        }
        )
      }
    }
}

