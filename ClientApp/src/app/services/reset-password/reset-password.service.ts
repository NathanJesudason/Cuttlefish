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

/**
 * Service for resetting password
 */
@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
private baseUrl: string = `${environment.url}TeamMembers`
  constructor(private http: HttpClient) { }

  /**
   * Send a reset password link to the given email
   * @param email the email to send the reset password link to
   * @returns `Observable<any>` the response from the backend
   */
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

  /**
   * Reset the password with the given `ResetPassword` object
   * @param resetPasswordObj the `ResetPassword` object to reset the password with
   * @returns `Observable<any>` the response from the backend
   */
  resetPassword(resetPasswordObj: ResetPassword){
    return this.http.post<any>(`${this.baseUrl}/reset-password`, resetPasswordObj)
  }
  
}
