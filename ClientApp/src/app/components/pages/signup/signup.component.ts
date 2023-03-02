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

  specialCharsRegex: string = "!@#$%^&*()_+={};:|,.<>?";
  medStrongRegex: string = `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[${this.specialCharsRegex}])(?=.{8,})`;

  constructor(
    private formbuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private messageService: MessageService,
    private user: UserService,
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

  verifySignUpForm(password: string, confirmPassword: string): boolean {
    // check if passwords match
    if (password !== confirmPassword) {
      this.messageService.add({severity: 'error', summary: 'Passwords do not match', life: 10000});
      return false;
    }

    // check if password is long enough
    if (password.length < 8) {
      this.messageService.add({severity: 'error', summary: 'Password must be at least 8 characters long', life: 10000});
      return false;
    }

    // check if password has a number
    if (!/\d/.test(password)) {
      this.messageService.add({severity: 'error', summary: 'Password must contain at least one number', life: 10000});
      return false;
    }

    // check if password has a special character
    if (!(new RegExp(`[${this.specialCharsRegex}]`)).test(password)) {
      this.messageService.add({severity: 'error', summary: 'Password must contain at least one special character', life: 10000});
      return false;
    }

    // check if password has an uppercase letter
    if (!/[A-Z]/.test(password)) {
      this.messageService.add({severity: 'error', summary: 'Password must contain at least one uppercase letter', life: 10000});
      return false;
    }

    return true;
  }

  Signup(){
    this.signUpButtonLoading = true;

    if (!this.verifySignUpForm(this.signUpForm.value.password, this.signUpForm.value.confirmPassword)) {
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
