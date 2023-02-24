import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordService } from '../server-api/reset-password.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {


  forgotPasswordForm!: FormGroup
  public email!: string


  constructor(private formbuilder: FormBuilder, private resetService: ResetPasswordService) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formbuilder.group({
      email: ['', Validators.required]
    })
    
  }


  sendEmail(){
    this.email = this.forgotPasswordForm.value

    // call api
    this.resetService.sendResetPasswordLink(this.forgotPasswordForm.value['email']).subscribe({
      next: (res)=>{
        alert('Reset password link sent')
        console.log("res: ", res)
        this.forgotPasswordForm.reset()
        this.email = ""
      },
      error:(err)=>{
        if (err.status === 500)
          alert('Error sending link. Check email entered.')
        else if(err.status === 404)
          alert('Email does not exist.')
        else
          alert('Error sending link.')
        console.log("error: ", err)
      }
    })
    
    
  }
}
