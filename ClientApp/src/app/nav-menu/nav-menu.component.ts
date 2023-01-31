import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../server-api/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  menuItems!: MenuItem[];
  accountMenuItems!: MenuItem[];

  constructor(private auth: AuthService ){

  }

  ngOnInit() {
    this.assignMenuItems();
  }

  assignMenuItems() {
    this.menuItems = [
      {
        icon: 'pi pi-home',
        label: 'Home',
        routerLink: ['/'],
      },
      {
        icon: 'pi pi-briefcase',
        label: 'Project',
        routerLink: ['/project', 0],
      },
      {
        icon: 'pi pi-stopwatch',
        label: 'Counter',
        routerLink: ['/counter'],
      },
      {
        icon: 'pi pi-cloud',
        label: 'Fetch Data',
        routerLink: ['/fetch-data'],
      },
      {
        icon: 'pi pi-cloud',
        label: 'Team Members',
        routerLink: ['/teammembers'],
      },
      {
        icon: 'pi pi-user',
        items: [
          {
            icon: 'pi pi-user',
            label: 'Account',
          },
          {
            icon: 'pi pi-cog',
            label: 'Settings',
          },
          {
            icon: 'pi pi-sign-out',
            label: 'Sign Out',
            command: (event)   => 
            { this.signOut()}
            ,
          },
        ],
      },
    ];

    
  }


  signOut(){
    this.auth.signOut()
  }
}
