import { Component, OnInit } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api';

import { ServerApi } from '../server-api/server-api.service';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent implements OnInit {
  forecasts: WeatherForecast[] = [];
  loading!: boolean;

  constructor(private serverApi: ServerApi) { }

  ngOnInit(): void {
    this.loading = true;
  }

  loadWeather(_event: LazyLoadEvent): void {
    this.loading = false;

    setTimeout(() => {
      this.serverApi.getWeatherForecast<WeatherForecast[]>().subscribe(data => {
        this.forecasts = data;
        this.loading = false;
      });
    }, 2000);
  }
}

export interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
