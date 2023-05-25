/*
* Component Folder: home-page
* Component Name: HomePageComponent
* Description:
*     Page displaying the content of the home page ('/'). The
*   home page is the first page the user sees when they navigate
*   to the website. The home page displays the text "Welcome to
*   Cuttlefish!", the Cuttlefish logo, and a button to navigate
*   to the login page.
*/

import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}
