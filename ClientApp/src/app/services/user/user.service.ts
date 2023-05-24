import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

/**
 * Service for interacting with the currently logged in user
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userName$ = new BehaviorSubject<string>("")
  private role$ = new BehaviorSubject<string>("")

  constructor() { }

    /**
     * Get the role of the currently logged in user
     * @returns `Observable<string>` the role of the currently logged in user
     */
    public getRole(){
      return this.role$.asObservable() // stream of data
    }

    /**
     * Set the role of the currently logged in user
     * @param role the role to set the currently logged in user to
     */
    public setRole(role:string){
      this.role$.next(role)
    }

    /**
     * Get the username of the currently logged in user
     * @returns `Observable<string>` the username of the currently logged in user
     */
    public getUserName(){
      return this.userName$.asObservable(); // stream of data
    }

    /**
     * Set the username of the currently logged in user
     * @param userName the username to set the currently logged in user to
     */
    public setUserName(userName: string){
        this.userName$.next(userName)
    }
}
