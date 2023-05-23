/*
* Component Folder: not-found-page
* Component Name: NotFoundPageComponent
* Description:
*     The not-found-page serves as the primary 404 page for the app.
*   It is intended to catch any and all invalid URLs and display a 404
*   error to the user. The page displays a message indicating that the
*   specifically requested information could not be found (see
*   ./not-found-page.component.html for more details). From the 404 page
*   the user can navigate back to the previous page using the browser's
*   back button.
*/

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

export enum NotFoundReason {
  Unknown,
  Project,
  Sprint,
  Task
};

@Component({
  selector: 'not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.css'],
})
export class NotFoundPageComponent {
  readonly NotFoundReason = NotFoundReason;
  
  url!: string[];
  notFoundReason!: NotFoundReason;
  invalidId!: string | undefined;
  
  constructor(
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit() {
    // Use the pushState method of the history API to rewrite the URL path
    history.pushState(null, '', '/404');

    this.getUrl();
    this.assignNotFoundReason();
    this.assignInvalidId();
  }

  getUrl() {
    this.url = this.route.snapshot.url.map(url => url.toString());
  }

  assignNotFoundReason() {
    if (this.url.length <= 1) {
      this.notFoundReason = NotFoundReason.Unknown;
      return;
    }

    if (this.url[0] !== 'not-found') {
      this.notFoundReason = NotFoundReason.Unknown;
      return;
    }

    if (this.url[1] === 'project') {
      this.notFoundReason = NotFoundReason.Project;
      return;
    }

    if (this.url[1] === 'sprint') {
      this.notFoundReason = NotFoundReason.Sprint;
      return;
    }

    if (this.url[1] === 'task') {
      this.notFoundReason = NotFoundReason.Task;
      return;
    }
  }

  assignInvalidId() {
    if (this.url.length <= 2) {
      this.invalidId = undefined;
      return;
    }

    this.invalidId = this.url[2];
  }

  goBack() {
    this.location.back();
  }
}
