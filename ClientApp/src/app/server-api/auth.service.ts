import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt'
import { FbLoginComponent } from '../login/fb-login/fb-login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = "http://localhost:5277/api/TeamMembers/"

  private userPayload: any

  constructor(private http : HttpClient, private router: Router, private fbLogin: FbLoginComponent) // inject HttpClient into the constructor of this service
  {
    this.userPayload = this.decodedToken()
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
    return !!localStorage.getItem('token') // if there is a token return true, else return false. later add implementation to validate token
  }

  signOut(){
    localStorage.clear();
    // can also do: localStorage.removeItem('token')
    this.router.navigate(['/login'])

  }

  decodedToken(){
    const jwtHelper = new JwtHelperService()
    const token = this.getToken()! // ! because it can be undefined
    return jwtHelper.decodeToken(token)
  }

  getUsernameFromToken(){
    if(this.userPayload)
      return this.userPayload.name  // this will be the user name
  }

  getRoleFromToken(){
    if(this.userPayload)
      return this.userPayload.role;
  }
}
