import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
import {
  catchError,
  throwError
} from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = `${environment.url}TeamMembers/`

  private userPayload: any

  constructor(private http : HttpClient, private router: Router) // inject HttpClient into the constructor of this service
  {
    this.userPayload = this.decodedToken()
  }

  isUserLoggedIn = false

  setHttpClient(http: HttpClient) {
    this.http = http;
  }

  signUp(teammemberObj : any){
    return this.http.post<any>(`${this.baseUrl}register`, teammemberObj)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === HttpStatusCode.Conflict) {
            return throwError(() => new Error(err.error.message));
          }
          return throwError(() => new Error('Unknown signup error'));
        }),
      );
  }

  login(loginObj : any){
    return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === HttpStatusCode.Unauthorized) {
            return throwError(() => new Error(err.error.message));
          }
          return throwError(() => new Error('Unknown login error'));
        }),
      );
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn(): boolean{
    this.isUserLoggedIn = !!localStorage.getItem('token') // if there is a token return true, else return false. later add implementation to validate token
    return this.isUserLoggedIn
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
