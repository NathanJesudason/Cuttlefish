import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userName$ = new BehaviorSubject<string>("")
  private role$ = new BehaviorSubject<string>("")

  constructor() { }

    public getRole(){
      return this.role$.asObservable() // stream of data
    }

    // setter. Whenever the role is set, anyone subscribing will recieve the value of role.
    public setRole(role:string){
      this.role$.next(role)
    }


    public getUserName(){
      return this.userName$.asObservable(); // stream of data
    }

    public setUserName(userName: string){
        this.userName$.next(userName)
    }
}
