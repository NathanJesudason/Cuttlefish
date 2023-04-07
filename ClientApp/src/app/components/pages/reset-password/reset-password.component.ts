import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { MessageService } from 'primeng/api';

import { ResetPasswordService } from 'src/app/services/reset-password/reset-password.service';
import { VerifyPasswordService } from 'src/app/services/verify-password/verify-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  providers: [MessageService],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup
  email!: string
  emailToken!: string

  medStrong: string = VerifyPasswordService.medStrong;
  specialChars: string = VerifyPasswordService.specialChars;

  resetPasswordButtonLoading: boolean = false;

  constructor(
    private formbuilder: FormBuilder,
    private resetService: ResetPasswordService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private verifyPasswordService: VerifyPasswordService,
  ) { }

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
    this.resetPasswordButtonLoading = true;

    if(this.verifyPasswordService.verifyPassword(
      this.messageService,
      this.resetPasswordForm.value['newpassword'],
      this.resetPasswordForm.value['confirmpassword']
    ) == false){
      this.resetPasswordButtonLoading = false;
      return;
    }

    this.resetPasswordForm.value['email'] = this.email 
    this.resetPasswordForm.value['emailToken'] = this.emailToken


    this.resetService.resetPassword(this.resetPasswordForm.value).subscribe({
      next:(res)=>{
        this.messageService.add({severity: 'success', summary: 'Password successfully reset', life: 10000});
        this.resetPasswordForm.reset();
        this.resetPasswordButtonLoading = false;
      },
      error:(err)=>{
        this.messageService.add({severity: 'error', summary: err.message, life: 10000});
        this.resetPasswordButtonLoading = false;
      },
    })
    
  }

}
