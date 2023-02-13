import { Component } from '@angular/core';

import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';

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
      LoginPageComponent,
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
