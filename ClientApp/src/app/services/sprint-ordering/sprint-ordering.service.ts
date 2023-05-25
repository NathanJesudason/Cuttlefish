import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  Observable,
  catchError,
  throwError
} from 'rxjs';

import { environment } from 'src/environments/environment';

/**
 * Service for performing ordering operations on tasks in sprints
 */
@Injectable({providedIn: 'root'})
export class SprintOrderingService {
  baseUrl: string = environment.url;
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  setHttpClient(http: HttpClient) {
    this.http = http;
  }
  
  /**
   * Tell the backend to move the given task to the new index in the given sprint
   * @param sprintId the id of the sprint to reorder tasks in
   * @param taskId the id of the task to reorder
   * @param newOrder the new index of the task
   */
  swapReorderTasksInSprint(sprintId: number, taskId: number, newOrder: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}Sprints/${sprintId}/swap-reorder`, { taskId: taskId, newOrder: newOrder })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => new Error(`Error reordering tasks: ${err.error.message}`));
        }),
      );
  }

  /**
   * Tell the backend to perform the order operations for removing a task from this sprint
   * @param sprintId the id of the sprint to remove the task from
   * @param oldOrder the order of the task to be removed from this sprint
   * 
   * DOESN'T DELETE OR MODIFY THE TASK, JUST PERFORMS ORDER OPERATIONS ON THE REST OF THE TASKS IN THE SPRINT IT'S BEING REMOVED FROM
   */
  removeReorderTasksInSprint(sprintId: number, oldOrder: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}Sprints/${sprintId}/remove-reorder`, { oldOrder: oldOrder })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => new Error(`Error reordering tasks: ${err.error.message}`));
        }),
      );
  }

  /**
   * Tell the backend to perform the order operations for adding a task to this sprint
   * @param sprintId the id of the sprint to reorder tasks in
   * @param newOrder the order of the task to be added to this sprint
   * 
   * DOESN'T ADD OR MODIFY THE TASK, THAT MUST BE DONE FIRST
   * 
   * THIS JUST PERFORMS ORDER OPERATIONS ON THE REST OF THE TASKS IN THE SPRINT IT'S BEING ADDED TO
   */
  addReorderTasksInSprint(sprintId: number, newOrder: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}Sprints/${sprintId}/add-reorder`, { newOrder: newOrder })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => new Error(`Error reordering tasks: ${err.error.message}`));
        }),
      );
  }
}
