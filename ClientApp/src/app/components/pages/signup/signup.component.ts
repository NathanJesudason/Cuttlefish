import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { VerifyPasswordService } from 'src/app/services/verify-password/verify-password.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [MessageService],
})
export class SignupComponent implements OnInit {
  //for signup form
  signUpForm!: FormGroup
  
  signUpButtonLoading: boolean = false;

  specialChars: string = VerifyPasswordService.specialChars;
  medStrong: string = VerifyPasswordService.medStrong;

  constructor(
    private formbuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private messageService: MessageService,
    private user: UserService,
    private verifyPasswordService: VerifyPasswordService,
  ) { }

  ngOnInit(): void {
    this.initSignUpForm();
  }

  initSignUpForm() {
    this.signUpForm = this.formbuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  Signup(){
    this.signUpButtonLoading = true;

    if (!this.verifyPasswordService.verifyPassword(this.messageService, this.signUpForm.value.password, this.signUpForm.value.confirmPassword)) {
      this.signUpButtonLoading = false;
      return;
    }
    
    this.auth.signUp(this.signUpForm.value)
      .subscribe({
        next: (_res) => {
          this.auth.login(this.signUpForm.value)
            .subscribe({
              next: (res) => {
                this.auth.storeToken(res.token);

                // this will update the username and role displayed on the homepage by getting the 'name' from the token
                const tokenPayload = this.auth.decodedToken();
                this.user.setUserName(tokenPayload.name);
                this.user.setRole(tokenPayload.role);

                this.signUpButtonLoading = false;
                this.router.navigate(['projects']);
              },
              error: (error) => {
                this.messageService.add({severity: 'error', summary: error.message, life: 10000});
                this.signUpButtonLoading = false;
              },
            });
        },
        error: (error) => {
          this.messageService.add({severity: 'error', summary: error.message, life: 10000});
          this.signUpButtonLoading = false;
        },
      });
  }
}
