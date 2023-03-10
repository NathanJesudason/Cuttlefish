import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import { ProjectService } from 'src/app/services/project/project.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

import { ProjectData } from 'src/types/project';

import { CreateProjectModalComponent } from 'src/app/components/modals/create-project-modal/create-project-modal.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.css'],
  providers: [MessageService],
})
export class ProjectsPageComponent implements OnInit {
  projects!: ProjectData[];

  username!: string;

  @ViewChild('createProjectModal') createProjectModal!: ElementRef<CreateProjectModalComponent>;

  constructor(
    private projectService: ProjectService,
    private authService: AuthService,
    private userService: UserService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.fetchProjectData();
    this.getCurrentUser();
  }

  fetchProjectData() {
    this.projectService.getAllProjects().subscribe({
      next: (projects: ProjectData[]) => {
        this.projects = projects;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  deleteProject(projectId: number) {
    this.projects = this.projects.filter((p) => p.id !== projectId);
    this.messageService.add({severity: 'success', summary: `Project ${projectId} deleted`});
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
