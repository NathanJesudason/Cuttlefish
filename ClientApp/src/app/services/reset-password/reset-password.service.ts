import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  catchError,
  throwError,
} from 'rxjs';

import { environment } from 'src/environments/environment';
import { ResetPassword } from 'src/types/reset-password.model';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
private baseUrl: string = `${environment.url}TeamMembers`
  constructor(private http: HttpClient) { }

  sendResetPasswordLink(email: string){
    return this.http.post<any>(`${this.baseUrl}/send-reset-email/${email}`, {})
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === HttpStatusCode.InternalServerError) {
            return throwError(() => new Error('Error sending link. Check to make sure your email is correct'));
          } else if (err.status === HttpStatusCode.NotFound) {
            return throwError(() => new Error('User with that email does not exist'));
          }
          return throwError(() => new Error('Error sending link'));
        }),
      );
  }

  resetPassword(resetPasswordObj: ResetPassword){
    return this.http.post<any>(`${this.baseUrl}/reset-password`, resetPasswordObj)
  }
  
}
