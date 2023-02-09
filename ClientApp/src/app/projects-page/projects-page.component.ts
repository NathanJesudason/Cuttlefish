import {
  Component,
  OnInit,
} from '@angular/core';

import { ServerApi } from '../server-api/server-api.service';

import { ProjectData } from '../../types/project';

@Component({
  selector: 'home-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.css'],
})
export class ProjectsPageComponent implements OnInit {
  projects!: ProjectData[];

  constructor(private serverApi: ServerApi) { }

  ngOnInit(): void {
    this.fetchProjectData();
  }

  fetchProjectData() {
    this.projects = this.serverApi.getAllProjects();
  }
}
