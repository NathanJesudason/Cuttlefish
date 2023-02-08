import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/api';

import { ServerApi } from '../server-api/server-api.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  menuItems!: MenuItem[];

  constructor(
    private serverApi: ServerApi,
  ) {}

  ngOnInit() {
    this.assignMenuItems();
  }

  assignMenuItems() {
    this.menuItems = [
      {
        icon: 'pi pi-briefcase',
        label: 'Projects',
        items: [],
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

    const projects = this.serverApi.getAllProjects();
    const projectMenuItems = projects.map(project => {
      return {
        icon: 'pi pi-briefcase',
        label: `${project.id}: ${project.name}`,
        routerLink: ['/project', project.id],
      } as MenuItem;
    });
    this.menuItems[0].items = projectMenuItems;
  }
}
