import { Component, Inject } from '@angular/core';
import { ServerApi } from '../server-api/server-api.service';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[] = [];

  constructor(serverApi: ServerApi) {
    serverApi.getWeatherForecast<WeatherForecast[]>()
      .subscribe(data => this.forecasts = data);
  }
}

export interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
