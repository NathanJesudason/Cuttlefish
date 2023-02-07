import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthService } from '../server-api/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private router: Router) {}

  // append a token to the header to send to the backend
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken()

    if(myToken){
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${myToken}`} // this is the format for sending a token to the backend using the request property
      })
    }

    
    if(!this.auth.isLoggedIn()){
      return next.handle(request).pipe()
    }

    return next.handle(request).pipe(
      catchError((err:any) => {
        if(err instanceof HttpErrorResponse){
          if(err.status === 401 ){
            this.auth.signOut()
            this.router.navigate(['/login'])
            return throwError(() => new Error('token expired, login again')) // console.log's this. might be better way to implement instead of console.logging it
          }
        }
        
        return throwError(() => new Error('Error occured')) 
      })
    );
  }
}
