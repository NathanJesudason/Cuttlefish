import {
  Component,
  OnInit
} from '@angular/core';

import { MenuItem } from 'primeng/api';

import { AuthService } from 'src/app/services/auth/auth.service';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  menuItems!: MenuItem[];

  accountItems = ["Account", "Settings","Sign Out"]
  item: string = ""
  currentItem!: string | null

  constructor(
    private auth: AuthService,
    private projectService: ProjectService,
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
        icon: 'pi pi-tag',
        label: 'Tasks By Label',
        routerLink: ['/label'],
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
            routerLink: ['/account']
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

    this.projectService.getAllProjects().subscribe({
      next: (projects) => {
        const projectMenuItems = projects.map((project) => {
          return {
            icon: 'pi pi-briefcase',
            label: `${project.id}: ${project.name}`,
            routerLink: ['/project', project.id],
          } as MenuItem;
        });
        this.menuItems[0].items = projectMenuItems;
      },
      error: (err) => {
        this.menuItems[0].items?.push({label: 'Error loading projects'});
      },
    });
    
  }


  signOut(){
    this.auth.signOut()
  }
}
