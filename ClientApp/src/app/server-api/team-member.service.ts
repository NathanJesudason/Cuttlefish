import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeamMember } from '../../types/team-member.model';
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

  refreshList(){
    this.http.get(`${this.baseURL}TeamMembers`).toPromise().then(
      res=> this.list = res as TeamMember[]
      ,(err)=>{
        console.log(err.message)
     }
    )
  }
}
