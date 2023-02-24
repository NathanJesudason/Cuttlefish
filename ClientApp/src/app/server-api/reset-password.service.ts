import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  }

  resetPassword(resetPasswordObj: ResetPassword){
    return this.http.post<any>(`${this.baseUrl}/reset-password`, resetPasswordObj)
  }
  
}
