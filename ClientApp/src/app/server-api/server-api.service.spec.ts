import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ServerApi } from './server-api.service';
import { WeatherForecast } from '../fetch-data/fetch-data.component';
import { defer } from 'rxjs';

describe('ServerApi', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let serverApi: ServerApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ 
        ServerApi,
        {
          provide: 'BASE_URL',
          useValue: '/'
        }
      ],
    });

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    serverApi = TestBed.inject(ServerApi);
    serverApi.setHttpClient(httpClientSpy);
  });

  it('should return mock getWeatherForecast', () => {
    const testData: WeatherForecast[] = [{
      date: '2022-11-14T23:28:27.95936-08:00',
      temperatureC: 27,
      temperatureF: 80,
      summary: 'Warm'
    }];

    // set what the http client's 'get' function should return
    // extra junk within returnValue to convert testData to Observable<WeatherForecast[]>
    httpClientSpy.get.and.returnValue(defer(() => Promise.resolve(testData)));

    // make the test get
    serverApi.getWeatherForecast<WeatherForecast[]>().subscribe(data =>
      expect(data).withContext('checking return value').toEqual(testData));
    
    // we expect one get to have been made
    expect(httpClientSpy.get.calls.count()).withContext('checking # of calls').toBe(1);
  });
});
