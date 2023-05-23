import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MessageService } from 'primeng/api';
import {
  Observable,
  catchError,
  throwError
} from 'rxjs';

import { TeamMember } from 'src/types/team-member.model';
import { environment } from 'src/environments/environment';

/**
 * Service for interacting with team members in the backend
 */
@Injectable({
  providedIn: 'root'
})
export class TeamMemberService {

  constructor(private http: HttpClient) { }

  /**
   * The `TeamMember` object this service uses to interact with the backend
   */
  teamMemberData: TeamMember = new TeamMember()

  /**
   * The list of `TeamMember`s this service uses to interact with the backend
   */
  list: TeamMember[] = []
  readonly baseURL = environment.url // this is the server port
 
  /**
   * Create a new team member in the backend, using `TeamMemberService.teamMemberData`
   * @returns `Observable<any>` the response from the backend
   */
  postTeamMember(){
    return this.http.post(this.baseURL, this.teamMemberData)
  }

  /**
   * Update the team member in the backend, using `TeamMemberService.teamMemberData`
   * @returns `Observable<any>` the response from the backend
   */
  putTeamMember(){
    return this.http.put(`${this.baseURL}/${this.teamMemberData.id}`, this.teamMemberData)
  }

  /**
   * Delete the team member with the given id from the backend
   * @param id the id of the team member to delete
   * @returns `Observable<any>` the response from the backend
   */
  deleteTeamMember(id:number){
    return this.http.delete(`${this.baseURL}/${id}`)
  }

  /**
   * Get all team members from the backend, and store them in `TeamMemberService.list`
   * @param messageService the `MessageService` to use to display errors
   */
  refreshList(messageService: MessageService){
    this.http.get(`${this.baseURL}TeamMembers`).subscribe({
      next: res => this.list = res as TeamMember[],
      error: (err) => {
        messageService.add({severity: 'error', summary: err.message});
      },
    });
  }

  /**
   * Get the team member with the given id from the backend
   * @param id the id of the team member to get
   * @returns `Observable<TeamMember>` the team member with the given id
   */
  getTeamMemberById(id: number): Observable<TeamMember> {
    return this.http.get<TeamMember>(`${this.baseURL}TeamMembers/${id}`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === HttpStatusCode.NotFound) {
            return throwError(() => new Error('User not found'));
          }
          return throwError(() => new Error(err.message));
        }),
      );
  }

  /**
   * Get the team member with the given username from the backend
   * @param username the username of the team member to get
   * @returns `Observable<TeamMember>` the team member with the given username
   */
  getTeamMemberByUsername(username: string): Observable<TeamMember> {
    return this.http.get<TeamMember>(`${this.baseURL}TeamMembers/by-username/${username}`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === HttpStatusCode.NotFound) {
            return throwError(() => new Error('User not found'));
          }
          return throwError(() => new Error(err.message));
        }),
      );
  }
}
