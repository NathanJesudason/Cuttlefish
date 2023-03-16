import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TeamMemberToProject } from 'src/types/team-member-to-project';

@Injectable({
  providedIn: 'root'
})
export class TeamMemberToProjectService {

  constructor(private http: HttpClient) { }
  readonly baseURL = `${environment.url}TeamMembersToProjects/`

  public teamMemberToProjectList!: TeamMemberToProject[]
  public teamMemberToProject!: TeamMemberToProject

  postTeamMemberToProject(){
    console.log('post teammember:', this.teamMemberToProject)
    return this.http.post(this.baseURL, this.teamMemberToProject)
  }

  putTeamMemberToProject(){
    return this.http.put
  }

  deleteTeamMemberToProject(){
    return this.http.delete
  }



  refreshList(){
    return this.http.get(`${this.baseURL}`)
  }


}
