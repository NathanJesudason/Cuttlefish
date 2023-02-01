import { Component, OnInit } from '@angular/core';
import { Form, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../server-api/auth.service';
import { UserService } from '../server-api/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // for showing and hiding the password
  type: string = "password" // used to replace text with password in login.component.html
  isText: boolean = false
  showIcon: string = "fa-eye-slash"

  //formGroup declared in html
  loginForm!: FormGroup
  
  constructor(private formbuilder: FormBuilder, private  auth : AuthService, private router: Router, private user: UserService) { }

  ngOnInit(): void {

    // from html we set the formControl name to corresponding names (username, password)
    this.loginForm = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  showOrHidePassword(){
    this.isText = !this.isText
    this.isText ? this.type = "text" : this.type = "password"
  }

  Login(){
    //validate user input
    // maybe if(this.loginForm.valid) with a bool propertry loginForm that gets updated from the html using Form

    // send to the database
    this.auth.login(this.loginForm.value)
    .subscribe({
        next: (res)=>{
          this.loginForm.reset()
          this.auth.storeToken(res.token)
          
          // this will update the username and role displayed on the homepage by getting the 'name' from the token
          const tokenPayload = this.auth.decodedToken()
          this.user.setUserName(tokenPayload.name)
          this.user.setRole(tokenPayload.role)

          this.router.navigate(['home'])
          alert(res.message)
        },
        error: (err)=>{
          console.log(err)
          console.log('incorrect username or password')
          //  alert(err?.error.message)
        }
      }
    )

    

  }

}
