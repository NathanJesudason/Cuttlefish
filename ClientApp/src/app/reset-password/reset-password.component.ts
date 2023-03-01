import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private formbuilder: FormBuilder, private resetService: ResetPasswordService, private route: ActivatedRoute, private router: Router) { }

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
    this.resetPasswordForm.value['email'] = this.email 
    this.resetPasswordForm.value['emailToken'] = this.emailToken


    this.resetService.resetPassword(this.resetPasswordForm.value).subscribe({
      next:(res)=>{
        alert('password reset')
        console.log("res: ", res)
        this.resetPasswordForm.reset()
        this.router.navigate(['login'])
      },
      error:(err)=>{
        alert('error resetting password')
        console.log("error: ", err)
      }
    })
    
  }

}
