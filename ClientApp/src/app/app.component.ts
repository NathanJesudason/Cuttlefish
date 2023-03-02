import { Component } from '@angular/core';
import { ForgotPasswordComponent } from './components/pages/forgotpassword/forgotpassword.component';

import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ResetPasswordComponent } from './components/pages/reset-password/reset-password.component';
import { SignupComponent } from './components/pages/signup/signup.component';

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
