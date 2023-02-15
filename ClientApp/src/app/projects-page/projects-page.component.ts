import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import { ServerApi } from '../server-api/server-api.service';

import { ProjectData } from '../../types/project';

import { CreateProjectModalComponent } from '../create-project-modal/create-project-modal.component';

@Component({
  selector: 'home-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.css'],
})
export class ProjectsPageComponent implements OnInit {
  projects!: ProjectData[];

  @ViewChild('createProjectModal') createProjectModal!: ElementRef<CreateProjectModalComponent>;

  constructor(private serverApi: ServerApi) { }

  ngOnInit(): void {
    this.fetchProjectData();
  }

  fetchProjectData() {
    this.projects = this.serverApi.getAllProjects();
  }

  showCreateProjectModal() {
    (this.createProjectModal as any).showCreateProjectModal();
  }
}
