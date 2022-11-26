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
}
