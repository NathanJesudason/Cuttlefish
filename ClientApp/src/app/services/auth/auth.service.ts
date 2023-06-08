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
import { funEmoji } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';

import { environment } from 'src/environments/environment';

/**
 * This service is used to authenticate users and store their tokens
 */
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

  /**
   * This method is used to register a new user in the backend
   * @param teammemberObj the teammember object to be registered in the backend
   * @returns an observable of the response from the backend
   */
  signUp(teammemberObj : any){
    const randomAvatarUri = createAvatar(funEmoji, {
      seed: teammemberObj.email,
      radius: 30,
    }).toDataUriSync();
    return this.http.post<any>(`${this.baseUrl}register`, {...teammemberObj, avatar: randomAvatarUri})
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === HttpStatusCode.Conflict) {
            return throwError(() => new Error(err.error.message));
          }
          return throwError(() => new Error('Unknown signup error'));
        }),
      );
  }

  /**
   * This method is used to authenticate a user in the backend
   * @param loginObj the login object to be authenticated in the backend
   * @returns an observable of the response from the backend
   */
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

  /**
   * Helper method to store the token in the browser's local storage
   * @param tokenValue the token to be stored in the browser's local storage
   */
  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }

  /**
   * Helper method to get the token from the browser's local storage
   * @returns the token stored in the browser's local storage
   */
  getToken(){
    return localStorage.getItem('token')
  }

  /**
   * Helper method to check if the user is logged in
   * @returns true if the user is logged in, false otherwise
   */
  isLoggedIn(): boolean{
    this.isUserLoggedIn = !!localStorage.getItem('token') // if there is a token return true, else return false. later add implementation to validate token
    return this.isUserLoggedIn
  }

  /**
   * Helper method to sign out the user, clearing local storage and redirecting to login page
   */
  signOut(){
    localStorage.clear();
    // can also do: localStorage.removeItem('token')
    this.router.navigate(['/login'])

  }

  /**
   * Helper method to decode the token stored in the browser's local storage
   * @returns the decoded token
   */
  decodedToken(){
    const jwtHelper = new JwtHelperService()
    const token = this.getToken()! // ! because it can be undefined
    return jwtHelper.decodeToken(token)
  }

  /**
   * Helper method to get the username of the user stored in the token
   * @returns the username of the user stored in the token
   * - may be undefined if user isn't logged in
   */
  getUsernameFromToken(){
    if(this.userPayload)
      return this.userPayload.name  // this will be the user name
  }

  /**
   * Helper method to get the role of the user stored in the token
   * @returns the role of the user stored in the token
   * - may be undefined if user isn't logged in
   */
  getRoleFromToken(){
    if(this.userPayload)
      return this.userPayload.role;
  }
}
