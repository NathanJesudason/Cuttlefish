import { Component } from '@angular/core';
import { ForgotPasswordComponent } from './forgotpassword/forgotpassword.component';

import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupComponent } from './signup/signup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  hideNavMenu!: boolean;

  assignHideNavMenu(event: any) {
    // pages on which we want to hide the nav bar
    const hideNavMenuPages: any[] = [
      HomePageComponent,
      LoginComponent,
      SignupComponent,
      ResetPasswordComponent,
      ForgotPasswordComponent
    ];

    for (const component of hideNavMenuPages) {
      if (event instanceof component) {
        this.hideNavMenu = true;
        return;
      }
    }
    this.hideNavMenu = false;
  }
}
