import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { SprintData } from '../../types/sprint';
import { TaskData } from '../../types/task';

@Injectable({providedIn: 'root'})
export class ServerApi {
  baseUrl: string;
  http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
    this.http = http;
  }

  setHttpClient(http: HttpClient) {
    this.http = http;
  }

  /**
   * Simple http GET of the `'weatherforecast'` endpoint that's provided in the sample.
   * No error checking is done
   * @type The type that you expect to receive in the result (`WeatherForecast[]`)
   * @return An `Observable<T>` that stores the body of the HTTP response
   */
  getWeatherForecast<T>(): Observable<T> {
    return this.http.get<T>(
      `${this.baseUrl}weatherforecast`,
      {
        // to get the full HttpResponse instead of just the body, set observe to 'response'
        observe: 'body',
        responseType: 'json'
      }
    );
  }

  getSprintData(id: number): SprintData {
    // simple initial function
    const date = new Date();
    if (id === 0) {
      date.setHours(new Date().getHours() - 1);
      return {
        id: 0,
        name: 'Sprint 0',
        dueDate: date,
        complete: false,
        tasks: [],
      };
    } else if (id === 1) {
      date.setHours(new Date().getHours() - 1);
      return {
        id: 1,
        name: 'Sprint 1',
        dueDate: date,
        complete: true,
        tasks: []
      };
    }
    return {
      id: -1,
      name: 'This is wrong',
      dueDate: date,
      complete: true,
      tasks: [],
    };
  }

  getTaskData(id: number): TaskData {
    // simple initial function
    if (id === 10000) {
      return {
        id: 10000,
        name: "Work on angular",
        assignee: "Sebastian Hardin",
        storyPoints: 5
      };
    } else if (id === 10001) {
      return {
        id: 10001,
        name: "Add properties to database",
        assignee: "Sebastian Hardin",
        storyPoints: 3
      };
    }
    return {
      id: 0,
      name: "Invalid task",
      assignee: "No one",
      storyPoints: 0
    };
  }

  getFullTaskData(id: number): TaskData {
    if (id === 10000) {
      return {
        id: 10000,
        name: "Work on angular",
        assignee: "Sebastian Hardin",
        storyPoints: 5
      };
    } else if (id === 10001) {
      return {
        id: 10001,
        name: "Add properties to database",
        assignee: "Sebastian Hardin",
        storyPoints: 3
      };
    }
    return {
      id: 0,
      name: "Invalid task",
      assignee: "No one",
      storyPoints: 0
    };
  }
}
