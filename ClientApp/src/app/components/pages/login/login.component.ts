import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  //formGroup declared in html
  loginForm!: FormGroup;

  loginButtonLoading: boolean = false;
  
  constructor(
    private formbuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private user: UserService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm() {
    // from html we set the formControl name to corresponding names (username, password)
    this.loginForm = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  Login(){
    this.loginButtonLoading = true;

    //validate user input
    // maybe if(this.loginForm.valid) with a bool propertry loginForm that gets updated from the html using Form

    // send to the database
    this.auth.login(this.loginForm.value)
      .subscribe({
        next: (res) => {
          this.loginForm.reset()
          this.auth.storeToken(res.token)

          // this will update the username and role displayed on the homepage by getting the 'name' from the token
          const tokenPayload = this.auth.decodedToken()
          this.user.setUserName(tokenPayload.name)
          this.user.setRole(tokenPayload.role)

          this.loginButtonLoading = false;
          this.router.navigate(['projects']);
        },
        error: (error) => {
          this.messageService.add({severity: 'error', summary: error.message, life: 10000});
          this.loginButtonLoading = false;
        },
      });
  }
}
