import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  catchError,
  map,
  Observable,
  switchMap,
  throwError
} from 'rxjs';

import { environment } from 'src/environments/environment';
import { TaskApi } from 'src/app/services/tasks/tasks.service';
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

  constructor(http: HttpClient, private taskApi: TaskApi) {
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
    if(getTasks){
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
          }),
          switchMap((project: ProjectData) => {
              return this.taskApi.getAllTasks().pipe(
                map((tasks) => {
                  project.sprints.forEach(element => {
                    let filteredTasks = tasks.filter(s => s.sprintID === element.id)
                    element.tasks = filteredTasks
                    const storyPointsSum = filteredTasks.reduce((storyPointsSum, current) => storyPointsSum += current.storyPoints, 0)
                    element.pointsAttempted = storyPointsSum
                    const completedPointsSum = filteredTasks.reduce((completedPointsSum, current) => {
                      if(current.progress === 'Done') {
                        return completedPointsSum += current.storyPoints;
                      }
                      return completedPointsSum;
                    }, 0);
                    element.pointsCompleted = completedPointsSum;
                  });
                  return project;
                }),
              );
            }
        ));
    } else {
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
  }

  /**
   * Get all sprints within the given project
   * @param projectId the id of the project to get the sprints for
   * @returns an `Observable<SprintData[]>` that stores the sprints
   * - the sprints won't be populated with tasks
   */
  getSprintsInProject(projectId: number): Observable<SprintData[]> {
    return this.http.get<BackendSprintData[]>(`${this.baseUrl}Sprints`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.error.message){
            return throwError(() => new Error(`Error getting sprints: ${err.error.message}`));
          }
          return throwError(() => new Error(`Error getting sprints: ${err.message}`));
        }),
        map((sprints: BackendSprintData[]) => {
          return sprints.filter(sprint => sprint.projectID === projectId)
            .map(sprint => backendSprintToSprintData(sprint));
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
    const newSprint: Partial<BackendSprintData> = {
      ...sprintDataToBackendSprint(sprint),
      id: undefined,
      storyPointsCompleted: 0,
      storyPointsAttempted: 0,
      projectID: projectId,
    }
    return this.http.post<BackendSprintData>(`${this.baseUrl}Sprints`, newSprint)
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
          if (err.error.message){
            return throwError(() => new Error(`Error deleting sprint: ${err.error.message}`));
          }
          return throwError(() => new Error(`Error deleting sprint: ${err.message}`));
        })
      );
  }

  /**
   * Update a sprint with the given data
   * @param id the id of the sprint to update
   * @param sprint the data to update the sprint with
   * - `id` will be ignored, the given `id` will be used
   * @returns an `Observable<void>` that completes when the sprint is updated
   */
  updateSprint(id: number, sprint: SprintData): Observable<void> {
    const backendSprint: BackendSprintData = {
      ...sprintDataToBackendSprint(sprint),
      id: id,
    };
    return this.http.put<void>(`${this.baseUrl}Sprints/${id}`, backendSprint)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.error.message) {
            return throwError(() => new Error(`Error updating sprint: ${err.error.message}`));
          }
          return throwError(() => new Error(`Error updating sprint: ${err.message}`));
        })
      );
  }
}
