import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  map,
  Observable
} from 'rxjs';

import { environment } from 'src/environments/environment';
import { ProjectData } from 'src/types/project';
import {
  BackendSprintData,
  backendSprintToSprintData,
} from 'src/types/sprint';

@Injectable({ providedIn: 'root' })
export class SprintService {
  baseUrl: string = environment.url;
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  setHttpClient(http: HttpClient) {
    this.http = http;
  }

  /**
   * Fill the given `ProjectData` with the sprints that belong to it
   * @param project the project to populate the sprints for
   * @param getTasks whether to populate the tasks within the sprints
   * @returns an `Observable<ProjectData>` that stores the project with the sprints
   */
  getSprintsForProject(project: ProjectData, getTasks: boolean): Observable<ProjectData> {
    return this.http.get<BackendSprintData[]>(`${this.baseUrl}Sprints`)
      .pipe(
        map((sprints: BackendSprintData[]) => {
          project.sprints = [];
          sprints = sprints.filter(sprint => sprint.projectID === project.id);
          sprints.forEach(sprint => {
            project.sprints.push(backendSprintToSprintData(sprint));
          });
          return project;
        })
      );
  }
}
