import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor(private http: HttpClient)
  {}

  readonly baseURL = `${environment.url}TeamMembers`


  patchAvatar(username: string, options: string){
    let body = {username: username, options: options}
    options = 'avatar'
    console.log("usernae:",username)
    return this.http.patch(`${this.baseURL}/avatars/${username}`, body)
  }

  loadAvatar(username: string){
      return this.http.get(`${this.baseURL}/username/${username}`)
  }
}
