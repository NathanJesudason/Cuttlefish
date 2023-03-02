import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { defer } from 'rxjs';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ 
        AuthService,
        
      ],
    });
      
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = TestBed.inject(AuthService);
    service.setHttpClient(httpClientSpy);
  });

  it('should return mock getWeatherForecast', () => {
    let body = {message: 'string'}
    let signUpBody = {username: "username", email: "email", password: "Username123."}
    let logininBody = {username: "username", password: "Username123."}

    // set what the http client's 'get' function should return
    // extra junk within returnValue to convert testData to Observable<WeatherForecast[]>
    httpClientSpy.post.and.returnValue(defer(() => Promise.resolve(body)));

    // make the test get
    service.signUp(signUpBody).subscribe(data =>
      expect(data).withContext('checking return value').toEqual(body));
    
    // we expect one get to have been made
    expect(httpClientSpy.post.calls.count()).withContext('checking # of calls').toBe(1);

    service.login(logininBody).subscribe(data =>
      expect(data).withContext('checking return value').toEqual(body));
    
    expect(httpClientSpy.post.calls.count()).withContext('checking # of calls').toBe(2);


  })
});
