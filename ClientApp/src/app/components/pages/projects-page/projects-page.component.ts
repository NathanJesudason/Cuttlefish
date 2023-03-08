import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import { ServerApi } from 'src/app/services/server-api/server-api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

import { ProjectData } from 'src/types/project';

import { CreateProjectModalComponent } from 'src/app/components/modals/create-project-modal/create-project-modal.component';

@Component({
  selector: 'projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.css'],
})
export class ProjectsPageComponent implements OnInit {
  projects!: ProjectData[];

  username!: string;

  @ViewChild('createProjectModal') createProjectModal!: ElementRef<CreateProjectModalComponent>;

  constructor(
    private serverApi: ServerApi,
    private authService: AuthService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.fetchProjectData();
    this.getCurrentUser();
  }

  fetchProjectData() {
    this.serverApi.getAllProjects().subscribe({
      next: (projects: ProjectData[]) => {
        this.projects = projects;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  showCreateProjectModal() {
    (this.createProjectModal as any).showCreateProjectModal();
  }

  getCurrentUser() {
    this.userService.getUserName().subscribe({
      next: (username: string) => {
        this.username = username || this.authService.getUsernameFromToken();
      },
    });
  }
}
