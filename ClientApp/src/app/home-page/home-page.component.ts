import {
  Component,
  OnInit,
} from '@angular/core';

import { ServerApi } from '../server-api/server-api.service';

import { ProjectData } from '../../types/project';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  projects!: ProjectData[];

  constructor(private serverApi: ServerApi) { }

  ngOnInit(): void {
    this.fetchProjectData();
  }

  fetchProjectData() {
    this.projects = this.serverApi.getAllProjects();
  }
}
