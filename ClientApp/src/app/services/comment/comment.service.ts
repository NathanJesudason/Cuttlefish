import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { BackendCommentData, CommentData, backendCommentToCommentData, commentDataToBackendComment } from 'src/types/comment';

@Injectable({ providedIn: 'root' })
export class CommentService {
  baseUrl: string = environment.url;
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  setHttpClient(http: HttpClient) {
    this.http = http;
  }

  /**
   * Create a comment with the given data
   * @param comment the data to create the comment with
   * - `id` will be ignored, the backend will assign the next available id
   * @returns `Observable<CommentData>` the created comment
   */
  createComment(comment: CommentData): Observable<CommentData> {
    comment.id = 0;
    const backendComment = commentDataToBackendComment(comment);
    return this.http.post(`${this.baseUrl}Comments`, backendComment)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.error.message) {
            return throwError(() => new Error(`Error creating comment: ${err.error.message}`));
          }
          return throwError(() => new Error(`Error creating comment: ${err.message}`));
        }),
        map((data: any) => {
          return backendCommentToCommentData(data);
        }),
      );
  }

  /**
   * Get a comment by its id
   * @param id the id of the comment to get
   * @returns `Observable<CommentData>` the comment with the given id
   */
  getComment(id: number): Observable<CommentData> {
    return this.http.get<BackendCommentData>(`${this.baseUrl}Comments/${id}`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.error.message) {
            return throwError(() => new Error(`Error getting comment: ${err.error.message}`));
          }
          return throwError(() => new Error(`Error getting comment: ${err.message}`));
        }),
        map((data: BackendCommentData) => {
          return backendCommentToCommentData(data);
        }),
      );
  }

  /**
   * Get comments by task id
   * @param taskId the id of the task to get comments for
   * @returns `Observable<CommentData[]>` the comments for the given task
   */
  getCommentsByTaskId(taskId: number): Observable<CommentData[]> {
    return this.http.get<BackendCommentData[]>(`${this.baseUrl}Task/${taskId}/Comments`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.error.message) {
            return throwError(() => new Error(`Error getting comments: ${err.error.message}`));
          }
          return throwError(() => new Error(`Error getting comments: ${err.message}`));
        }),
        map((data: BackendCommentData[]) => {
          return data.map(backendCommentToCommentData);
        }),
      );
  }

  /**
   * Update a comment with the given data
   * @param id the comment to update
   * @param comment the data to update the comment with
   * @returns an `Observable` that completes when the project is updated
   */
  updateComment(id: number, comment: CommentData): Observable<void> {
    const backendComment = commentDataToBackendComment(comment);
    return this.http.put<void>(`${this.baseUrl}Comments/${id}`, backendComment)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.error.message) {
            return throwError(() => new Error(`Error updating comment: ${err.error.message}`));
          }
          return throwError(() => new Error(`Error updating comment: ${err.message}`));
        }),
      );
  }

  /**
   * Delete a comment by its id
   * @param id the id of the comment to delete
   * @returns an `Observable` that completes when the comment is deleted
   */
  deleteComment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}Comments/${id}`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.error.message) {
            return throwError(() => new Error(`Error deleting comment: ${err.error.message}`));
          }
          return throwError(() => new Error(`Error deleting comment: ${err.message}`));
        }),
      );
  }
}
