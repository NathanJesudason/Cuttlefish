import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = "http://localhost:5277/api/TeamMember/"
  constructor(private http : HttpClient) // inject HttpClient into the constructor of this service
  {

  }

  signUp(teammemberObj : any){
    return this.http.post<any>(`${this.baseUrl}register`, teammemberObj)
  }

  login(loginObj : any){
    return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj)

  }
}
