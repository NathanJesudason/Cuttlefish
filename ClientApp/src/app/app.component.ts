import { Component } from '@angular/core';
import { ForgotPasswordComponent } from 'src/app/components/pages/forgotpassword/forgotpassword.component';

import { HomePageComponent } from 'src/app/components/pages/home-page/home-page.component';
import { LoginComponent } from 'src/app/components/pages/login/login.component';
import { ResetPasswordComponent } from 'src/app/components/pages/reset-password/reset-password.component';
import { SignupComponent } from 'src/app/components/pages/signup/signup.component';
import { NotFoundPageComponent } from 'src/app/components/pages/not-found-page/not-found-page.component';

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
      ForgotPasswordComponent,
      NotFoundPageComponent
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
