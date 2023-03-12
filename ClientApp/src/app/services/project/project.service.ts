import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  catchError,
  map,
  Observable,
  of,
  switchMap,
  throwError
} from 'rxjs';

import { SprintService } from 'src/app/services/sprint/sprint.service';

import { environment } from 'src/environments/environment';
import {
  backendProjectToProjectData,
  ProjectData,
  projectDataToBackendProject,
  ProjectNotFoundError
} from 'src/types/project';
import { SprintData } from 'src/types/sprint';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  baseUrl: string = environment.url;
  http: HttpClient;

  constructor(
    http: HttpClient,
    private sprintService: SprintService,
  ) {
    this.http = http;
  }

  setHttpClient(http: HttpClient) {
    this.http = http;
  }

  /**
   * Create a project with the given data
   * @param project the data to create the project with
   *  - `id` will be ignored, the backend will assign the next available id
   * @returns `Observable<ProjectData>` the created project
   */
  createProject(project: ProjectData): Observable<ProjectData> {
    project.id = 0;
    const backendProject = projectDataToBackendProject(project);
    return this.http.post(`${this.baseUrl}Projects`, backendProject)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => new Error(`Error creating project: ${err.error.message}`));
        }),
        map((data: any) => {
          return backendProjectToProjectData(data);
        }),
        switchMap((project: ProjectData) => {
          // when creating a sprint, populate it with a backlog
          const basicBacklog: SprintData = {
            id: -1,
            name: 'Backlog',
            goal: '<p>A backlog to store all tasks not in a sprint</p>',
            startDate: new Date(),
            endDate: new Date(),
            isCompleted: false,
            pointsCompleted: 0,
            pointsAttempted: 0,
            projectId: project.id,
            isBacklog: true,
            tasks: [],
          };
          return this.sprintService.createSprint(project.id, basicBacklog)
            .pipe(
              map((sprint) => {
                return {...project, sprints: [sprint]};
              }),
            );
        }),
      );
  }

  /**
   * Get all projects that the logged in user is a part of
   * @returns `Observable<ProjectData[]>`, all projects, which have empty `sprints` arrays
   */
  getAllProjects(): Observable<ProjectData[]> {
    return this.http.get(`${this.baseUrl}Projects`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => new Error(`Error getting projects: ${err.error.message}`));
        }),
        map((data: any) => {
          let projects: ProjectData[] = [];
          for (let project of data) {
            projects.push(backendProjectToProjectData(project));
          }
          return projects;
        }),
      );
  }

  /**
   * Get a project with the given id
   * @param id the id of the project to get
   * @param getSprints whether to get the sprints for the project
   * @param getTasks whether to get the tasks for the sprints
   * @returns the project `Observable<ProjectData>`
   */
  getProject(id: number, getSprints: boolean, getTasks: boolean): Observable<ProjectData> {
    return this.http.get<ProjectData>(`${this.baseUrl}Projects/${id}`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => new ProjectNotFoundError(`Error getting project: ${err.error.message}`, id));
        }),
        map((data: any) => {
          return backendProjectToProjectData(data);
        }),
        switchMap((project: ProjectData) => {
          if (getSprints) {
            return this.sprintService.getSprintsForProject(project, getTasks);
          }
          return of(project);
        }),
      );
  }

  /**
   * Delete a project with the given id
   * @param id the id of the project to delete
   * @returns an `Observable` that completes when the project is deleted
   */
  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}Projects/${id}`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => new Error(`Error deleting project: ${err.error.message}`));
        }),
      );
  }

  /**
   * Update a project with the given data
   * @param id the project to update
   * @param project the data to update the project with
   *  - `id` will be ignored, use the `id` parameter instead
   * @returns an `Observable` that completes when the project is updated
   */
  updateProject(id: number, project: ProjectData): Observable<void> {
    project.id = id;
    const backendProject = projectDataToBackendProject(project);
    return this.http.put<void>(`${this.baseUrl}Projects/${id}`, backendProject)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => new Error(`Error updating project: ${err.error.message}`));
        }),
      );
  }
}
