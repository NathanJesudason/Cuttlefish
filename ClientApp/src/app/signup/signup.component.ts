import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../server-api/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


   // for showing and hiding the password
   type: string = "password" // used to replace text with password in login.component.html
   isText: boolean = false
   isText2: boolean = false
   showIcon: string = "fa-eye-slash"

   //for signup form
   signUpForm!: FormGroup

  constructor(private formbuilder : FormBuilder, private auth : AuthService, private router: Router) { }

  ngOnInit(): void {

    this.signUpForm = this.formbuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }


  showOrHidePassword(){
    this.isText = !this.isText
    this.isText ? this.type = "text" : this.type = "password"
  }


  Signup(){
      this.auth.signUp(this.signUpForm.value)
      .subscribe(
        {
          next:(res =>{
            alert(res.message)
            this.signUpForm.reset()
            this.router.navigate(['home'])
          }),
            error: (err=>{alert(err?.error.message)})
        }
      )
  }


}
