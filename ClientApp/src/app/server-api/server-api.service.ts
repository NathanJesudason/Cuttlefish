import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

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

  getSprintData<T>(id: number): T {
    // simple initial function
    if (id === 0) {
      return {
        name: 'Sprint 0',
        dueDate: new Date().setHours(new Date().getHours() - 1),
        complete: false,
      } as T;
    } else if (id === 1) {
      return {
        name: 'Sprint 1',
        dueDate: new Date().setHours(new Date().getHours() - 3),
        complete: true,
      } as T;
    }
    return {
      name: 'This is wrong',
      dueDate: new Date(),
      complete: true,
    } as T;
  }

  getTaskData<T>(id: number): T {
    // simple initial function
    if (id === 10000) {
      return {
        id: 10000,
        name: "Work on angular",
        assignee: "Sebastian Hardin",
        storyPoints: 5
      } as T;
    } else if (id === 10001) {
      return {
        id: 10001,
        name: "Add properties to database",
        assignee: "Sebastian Hardin",
        storyPoints: 3
      } as T;
    }
    return {
      id: 0,
      name: "Invalid task",
      assignee: "No one",
      storyPoints: 0
    } as T;
  }
}
