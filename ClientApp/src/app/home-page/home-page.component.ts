import {
  Component,
  OnInit,
} from '@angular/core';

import { ServerApi } from '../server-api/server-api.service';

import { ProjectData } from '../../types/project';
import { UserService } from '../server-api/user.service';
import { AuthService } from '../server-api/auth.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  projects!: ProjectData[];


  public username: string = ""
  public role!: string


  constructor(private serverApi: ServerApi, private user: UserService, private auth: AuthService) { }

  ngOnInit(): void {
    

    this.user.getUserName().subscribe( value => 
      {
        let usernameFromToken = this.auth.getUsernameFromToken()
        this.username = value || usernameFromToken // this will be faster and get name from both the observable and then the token
      }
    )


    // check which role the user is and display certain things in the UI. use: *ngIf="role === <what role user needs to be to access element>" in an element
    // this.user.getRole().subscribe(value =>
    //   {
    //     const rolefromToken = this.auth.getRoleFromToken()
    //     this.role = value || rolefromToken
    //     // this.role = 'Admin' // for testing
    //   })

    this.fetchProjectData();
  }

  fetchProjectData() {
    this.projects = this.serverApi.getAllProjects();
  }
}
