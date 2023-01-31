import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = "http://localhost:5277/api/TeamMember/"
  constructor(private http : HttpClient, private router: Router) // inject HttpClient into the constructor of this service
  {

  }

  signUp(teammemberObj : any){
    return this.http.post<any>(`${this.baseUrl}register`, teammemberObj)
  }

  login(loginObj : any){
    return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj)

  }

  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token') // if there is a token return true, else return false
  }

  signOut(){
    localStorage.clear();
    // can also do: localStorage.removeItem('token')
    this.router.navigate(['/login'])

  }
}
