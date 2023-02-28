import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../server-api/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  //for signup form
  signUpForm!: FormGroup
  
  signupButtonLoading: boolean = false;

  constructor(
    private formbuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.signUpForm = this.formbuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  Signup(){
    this.auth.signUp(this.signUpForm.value)
      .subscribe({
        next: (res) => {
          alert(res.message)
          this.signUpForm.reset()
          this.auth.login(this.signUpForm.value)
          this.router.navigate(['projects'])
        },
        error: (error) => {
          console.log(error)
        },
      });
  }
}
