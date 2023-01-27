import { Component } from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { ServerApi } from '../server-api/server-api.service';

import {
  ProjectData,
  ProjectNotFoundError
} from '../../types/project';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss'],
  providers: [MessageService],
})
export class ProjectPageComponent {
  projectData!: ProjectData;

  collapseButtonText: 'Collapse All' | 'Uncollapse All' = 'Collapse All';
  sprintsCollapsed: boolean = false;
  completedSprintsShown: boolean = false;
  
  constructor(
    private serverApi: ServerApi,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.loadProjectData();
  }

  loadProjectData() {
    const id = Number(this.route.snapshot.paramMap.get('id')!);

    try {
      this.projectData = this.serverApi.getProjectData(id);
    } catch (error) {
      if (error instanceof ProjectNotFoundError) {
        this.router.navigate(['not-found', 'project', this.route.snapshot.paramMap.get('id')!]);
        return;
      }
    }
  }

  toggleCollapseSprints() {
    this.sprintsCollapsed = !this.sprintsCollapsed;
    if (this.collapseButtonText === 'Collapse All') {
      this.collapseButtonText = 'Uncollapse All';
    } else {
      this.collapseButtonText = 'Collapse All';
    }
    this.messageService.add({severity: 'success', summary: `Sprints are collapsed? ${this.sprintsCollapsed}`});
  }

  toggleHideCompletedSprints() {
    this.messageService.add({severity: 'success', summary: `Completed sprints are shown? ${this.completedSprintsShown}`});
  }
}
