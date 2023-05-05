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
