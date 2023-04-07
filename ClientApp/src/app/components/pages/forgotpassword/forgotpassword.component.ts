import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { MessageService } from 'primeng/api';

import { ResetPasswordService } from 'src/app/services/reset-password/reset-password.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss'],
  providers: [MessageService],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup
  public email!: string

  forgotPasswordButtonLoading: boolean = false;

  constructor(
    private formbuilder: FormBuilder,
    private resetService: ResetPasswordService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formbuilder.group({
      email: ['', Validators.required]
    })
    
  }


  sendEmail(){
    this.forgotPasswordButtonLoading = true;
    this.email = this.forgotPasswordForm.value

    // call api
    this.resetService.sendResetPasswordLink(this.forgotPasswordForm.value['email']).subscribe({
      next: (res)=>{
        this.messageService.add({severity: 'success', summary: 'Reset password link sent', life: 10000});
        this.forgotPasswordForm.reset()
        this.email = ""
        this.forgotPasswordButtonLoading = false;
      },
      error: (err: Error) => {
        this.messageService.add({severity: 'error', summary: err.message, life: 10000});
        this.forgotPasswordButtonLoading = false;
      },
    });
  }
}
