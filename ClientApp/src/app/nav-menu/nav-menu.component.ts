import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  menuItems!: MenuItem[];
  accountMenuItems!: MenuItem[];

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
          },
        ],
      },
    ];

    this.accountMenuItems = [
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
      },
    ];
  }
}
