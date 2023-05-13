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

@Injectable({
  providedIn: 'root'
})
export class TeamMemberService {

  constructor(private http: HttpClient) { }

  teamMemberData: TeamMember = new TeamMember()
  list: TeamMember[] = []
  readonly baseURL = environment.url // this is the server port
 
  postTeamMember(){
    return this.http.post(this.baseURL, this.teamMemberData)
  }

  putTeamMember(){
    return this.http.put(`${this.baseURL}/${this.teamMemberData.id}`, this.teamMemberData)
  }

  deleteTeamMember(id:number){
    return this.http.delete(`${this.baseURL}/${id}`)
  }

  refreshList(messageService: MessageService){
    this.http.get(`${this.baseURL}TeamMembers`).subscribe({
      next: res => this.list = res as TeamMember[],
      error: (err) => {
        messageService.add({severity: 'error', summary: err.message});
      },
    });
  }

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
