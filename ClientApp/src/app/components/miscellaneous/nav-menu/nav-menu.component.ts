/*
* Component Folder: nav-menu
* Component Name: NavMenuComponent
* Description:
*     The nav-menu is the main navigation menu and header of the application. It is displayed
*   on all pages of the application except the home and login pages. It contains the following
*   content: Project, Tasks By Label, Team Members, and Account. The nav is displayed permanently
*   opened by default, but collapses on smaller screens.
*/

import {
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  MenuItem,
  MessageService
} from 'primeng/api';

import { ProjectData } from 'src/types/project';

import { AuthService } from 'src/app/services/auth/auth.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { TeamMemberService } from 'src/app/services/team-member/team-member.service';
import { UserService } from 'src/app/services/user/user.service';

import { CreateProjectModalComponent } from 'src/app/components/modals/create-project-modal/create-project-modal.component';
import { TeamMember } from 'src/types/team-member.model';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
  providers: [MessageService],
})
export class NavMenuComponent implements OnInit {
  menuItems!: MenuItem[];
  userMenuItems!: MenuItem[];
  projects!: ProjectData[];

  @ViewChild('createProjectModal') createProjectModal!: ElementRef<CreateProjectModalComponent>;

  accountItems = ["Account", "Settings","Sign Out"]
  item: string = ""
  currentItem!: string | null

  signedInUser!: TeamMember;

  constructor(
    private authService: AuthService,
    private projectService: ProjectService,
    private userService: UserService,
    private teamMemberService: TeamMemberService,
    private messageService: MessageService,
  ) {}

  

  ngOnInit() {
    this.getSignedInUser();
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
    ];

    this.userMenuItems = [
      {
        icon: 'pi pi-user',
        label: 'Account',
        routerLink: ['/account']
      },
      {
        icon: 'pi pi-sign-out',
        label: 'Sign Out',
        command: (event) => {this.signOut()},
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

  getSignedInUser() {
    this.userService.getUserName().subscribe({
      next: (username: string) => {
        const signedInUserName = username || this.authService.getUsernameFromToken();
        this.teamMemberService.getTeamMemberByUsername(signedInUserName).subscribe({
          next: (teamMember: TeamMember) => {
            this.signedInUser = teamMember;
          },
          error: (err) => {
            this.messageService.add({severity: 'error', summary: err.error.message});
          },
        });
      },
    });
  }


  signOut(){
    this.authService.signOut()
  }
}
