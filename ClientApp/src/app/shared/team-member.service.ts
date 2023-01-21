import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeamMember } from './team-member.model';

@Injectable({
  providedIn: 'root'
})
export class TeamMemberService {

  constructor(private http: HttpClient) { }

  teamMemberData: TeamMember = new TeamMember()
  list: TeamMember[] = []
  readonly baseURL = "http://localhost:5277/api/Teammember" // this is the server port
 
  postTeamMember(){
    return this.http.post(this.baseURL, this.teamMemberData)
  }

  putTeamMember(){
    return this.http.put(`${this.baseURL}/${this.teamMemberData.team_memberID}`, this.teamMemberData)
  }

  deleteTeamMember(id:number){
    return this.http.delete(`${this.baseURL}/${id}`)
  }

  refreshList(){
    this.http.get(this.baseURL).toPromise().then(
      res=> this.list = res as TeamMember[]
    )
  }
}
