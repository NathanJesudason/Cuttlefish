import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router){

  }
  
  canActivate(): boolean{
    // route: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return this.auth.isUserLoggedIn
    if(this.auth.isLoggedIn()){
     
      return true
    }
    else{
      alert('login to view')
      this.router.navigate(['/login']) // route to login page if user is not logged in
      return false
    }
  }
  
}
