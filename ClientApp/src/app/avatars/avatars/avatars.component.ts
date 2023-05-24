import { Component, Injectable, OnInit } from '@angular/core';
import { schema, createAvatar } from '@dicebear/core';
import { funEmoji } from '@dicebear/collection';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TeamMember } from 'src/types/team-member.model';
import {eyesOptions, mouthOptions} from 'src/types/avatar'

// @Component({
//   selector: 'avatars',
//   templateUrl: './avatars.component.html',
//   styleUrls: ['./avatars.component.css']
// })
// export class AvatarsComponent implements OnInit {

//   public imageSrc = `` 
//   seed = ``
//   mouth = "plain"
//   eyes = "plain"
//   index = 0
//   translateX = 0
//   translateY = 0
//   backgroundColor = "468dfa"
//   backgroundType = "solid"
//   options: any
//   username:string = ""


  

//   constructor(private avatarService: AvatarService, private userService: UserService, private authService: AuthService) { }

//   ngOnInit(): void {

//     this.getUsername()
//     this.loadAvatar()
    
//   }

//   getUsername(){
//     this.userService.getUserName().subscribe({
//       next: (username: string) => {
//         this.username = username || this.authService.getUsernameFromToken();
//       },
//       error: err => console.log("Error getting username: ", err)
//     });
//   }

//   loadAvatar(){
//     if(this.username){
//       this.avatarService.loadAvatar(this.username).subscribe({
//         next: res=> {
//           let avatar
//           let options = res as TeamMember
//           console.log('options: ', options)
//           if (!options.avatar){
//             return
//           }else{
            
//           // check it it's an object
//           // if (options.avatar[0] == "{"){
//           //   let options2 = JSON.parse(options.avatar)
//           //   console.log("Avatar2: ", options.avatar)
            
//           //   avatar = createAvatar(funEmoji,
//           //     options2  
//           //   )
//           // }
//           // else{
//           //   avatar = createAvatar(funEmoji,
//           //     {
//           //       seed: options.avatar
//           //     }
//           //     )
//           //   }
          
//           // avatar.toDataUri().then(
//           //   res => {this.imageSrc = res 
//           //     console.log('avatar', this.imageSrc)},
//           //   err => console.log('err', err)
//           //   )
//           this.imageSrc = options.avatar
//           }
//         },
//         error: err=> {console.log("Error getting avatar: ", err)}
//       })
//     }
//   }

 

//   nextMouth(){
//     if(this.index <= mouthOptions.length)
//         this.mouth = mouthOptions[this.index++]
//     else
//       this.index = 0
//   }

//   nextEyes(){
//     if(this.index <= eyesOptions.length)
//         this.eyes = eyesOptions[this.index++]
//     else
//       this.index = 0
//   }
//   changeColor(color: string){
//     if(color.length > 6)
//       color = color.substring(1)
//     console.log("color ", color)
//     this.backgroundColor = color 
//   }

//   getAvatars(options: any){
//     this.options = options
//     this.options = JSON.stringify(options)
//     //reset the random seed
//     this.seed = ""

//     let avatar = createAvatar(funEmoji,
//         options
//     )

//     avatar.toDataUri().then(
//       res => this.imageSrc = res ,
//       err => console.log('err', err)
//     )
//   }

//   getRandomAvatar(){
//     let randomString =  Math.random().toString().slice(2,10)
//     this.seed = randomString
//     let avatar = createAvatar(funEmoji,
//       {
//         seed: randomString,
//         radius: 30
//       }
//     )

//   avatar.toDataUri().then(
//     res => this.imageSrc = res ,
//     err => console.log('err', err)
//   )
//   }

//   saveAvatar(){
//     let request: string 
//     if (this.seed != "")
//       request = this.seed
//     else 
//       request = this.options

//     console.log('imgsrc',this.imageSrc)
//     if (this.username){
//       this.avatarService.patchAvatar(this.username, this.imageSrc).subscribe(
//         res => {
//           console.log("result:", res) 
//           return res
//         },
//         err => {
//           console.log("error:", err) 
//           return err
//         }
//         )
//       }
//     }
// }



// @Injectable({
//   providedIn: 'root'
// })
// export class AvatarService{
//   constructor(private http: HttpClient)
//   {}

//   readonly baseURL = `${environment.url}TeamMembers`


//   patchAvatar(username: string, options: string){
//     let body = {username: username, options: options}
//     options = 'avatar'
//     console.log("usernae:",username)
//     return this.http.patch(`${this.baseURL}/avatars/${username}`, body)
//   }

//   loadAvatar(username: string){
//       return this.http.get(`${this.baseURL}/username/${username}`)
//   }
// }