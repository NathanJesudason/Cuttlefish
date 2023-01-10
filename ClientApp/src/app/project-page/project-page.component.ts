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

@Component({
  selector: 'project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css'],
})
export class ProjectPageComponent {
  projectData!: ProjectData;
  
  constructor(
    private serverApi: ServerApi,
    private route: ActivatedRoute,
    private router: Router,
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
}
