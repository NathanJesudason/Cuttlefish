import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  catchError,
  map,
  Observable,
  throwError
} from 'rxjs';

import { environment } from 'src/environments/environment';
import { ProjectData } from 'src/types/project';
import {
  BackendSprintData,
  backendSprintToSprintData,
  SprintData,
  sprintDataToBackendSprint,
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
        catchError((err: HttpErrorResponse) => {
          return throwError(() => new Error(`Error getting sprints: ${err.error.message}`));
        }),
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

  /**
   * Create a new sprint in the given project
   * @param projectId the id of the project to create the sprint in
   * @param sprint the sprint to create, with several ignored fields:
   * - `id`, the backend will assign the next available id
   * - `pointsCompleted` and `pointsAttempted`, both 0 for a new sprint
   * - `projectId`, the given `projectId` will be used
   * - `tasks`, empty list for a new sprint
   * @returns an `Observable<SprintData>` that stores the created sprint
   */
  createSprint(projectId: number, sprint: SprintData): Observable<SprintData> {
    sprint.pointsCompleted = 0;
    sprint.pointsAttempted = 0;
    sprint.projectId = projectId;
    return this.http.post<BackendSprintData>(`${this.baseUrl}Sprints`, {...sprintDataToBackendSprint(sprint), id: undefined})
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => new Error(`Error creating sprint: ${err.error.message}`));
        }),
        map((sprint: BackendSprintData) => {
          return backendSprintToSprintData(sprint);
        }),
      );
  }

  /**
   * Delete the sprint with the given id
   * @param id the id of the sprint to delete
   * @returns an `Observable<void>` that completes when the sprint is deleted
   */
  deleteSprint(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}Sprints/${id}`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => new Error(`Error deleting sprint: ${err.error.message}`));
        })
      );
  }
}
