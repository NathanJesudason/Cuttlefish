import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router
} from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';

/**
 * Guard for checking if a user is logged in
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router){
  }
  
  canActivate(): boolean{
    if(this.auth.isLoggedIn())
      return true
    else{
      alert('login to view')
      this.router.navigate(['/login']) // route to login page if user is not logged in
      return false
    }
  }
}
