import {
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';

import { MenuItem } from 'primeng/api';

import { ProjectData } from 'src/types/project';

import { AuthService } from 'src/app/services/auth/auth.service';
import { ProjectService } from 'src/app/services/project/project.service';

import { CreateProjectModalComponent } from 'src/app/components/modals/create-project-modal/create-project-modal.component';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  menuItems!: MenuItem[];
  projects!: ProjectData[];

  @ViewChild('createProjectModal') createProjectModal!: ElementRef<CreateProjectModalComponent>;

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
        items: [{
          icon: 'pi pi-plus',
          label: 'New Project',
          command: () => {
            (this.createProjectModal as any).showCreateProjectModal();
          },
        }],
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
        this.projects = projects;
        const projectMenuItems = projects.map((project) => {
          return {
            icon: 'pi pi-briefcase',
            label: `${project.id}: ${project.name}`,
            routerLink: ['/project', project.id],
          } as MenuItem;
        });
        this.menuItems[0].items = [...this.menuItems[0].items!, ...projectMenuItems];
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
