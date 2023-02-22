import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResetPasswordService } from '../server-api/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {


  resetPasswordForm!: FormGroup
  email!: string
  emailToken!: string
  constructor(private formbuilder: FormBuilder, private resetService: ResetPasswordService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      this.email = params['email']
      this.emailToken = params['code'] 
    })

    this.resetPasswordForm = this.formbuilder.group({
      email: [''],
      emailToken: [''],
      newpassword: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    })
  }

  resetPassword(){
    console.log("email:", this.email)
    console.log("reset password form b4:", this.resetPasswordForm.value)

    // this.resetPasswordForm.addControl('email', this.email)
    this.resetPasswordForm.value['email'] = this.email 
    // this.resetPasswordForm.addControl('emailToken', this.emailToken)
    this.resetPasswordForm.value['emailToken'] = this.emailToken

    console.log("reset password form after:", this.resetPasswordForm.value)

    this.resetService.resetPassword(this.resetPasswordForm.value).subscribe({
      next:(res)=>{
        alert('password reset')
        console.log("res: ", res)
        this.resetPasswordForm.reset()
      },
      error:(err)=>{
        alert('error resetting password')
        console.log("error: ", err)
      }
    })
    
  }

}
