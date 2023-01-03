import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectData } from '../../types/project';
import { ServerApi } from '../server-api/server-api.service';

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
  ) { }

  ngOnInit() {
    this.loadProjectData();
  }

  loadProjectData() {
    const id = Number(this.route.snapshot.paramMap.get('id')!);
    this.projectData = this.serverApi.getProjectData(id);
  }
}
