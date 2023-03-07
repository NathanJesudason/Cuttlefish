import { RouterModule } from '@angular/router';

import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';

import { BehaviorSubject } from 'rxjs';

import { UserService } from 'src/app/services/user/user.service';

import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {

  beforeEach(() => {
    return MockBuilder(HomePageComponent, [RouterModule]).mock(
      UserService, {
        getUserName: () => {
          return new BehaviorSubject<string>("").asObservable()
        } 

      } as Partial<UserService>
    );
  });

  it('should create', () => {
    MockRender(HomePageComponent);
    expect(ngMocks.findAll(HomePageComponent)[0]).toBeTruthy();
  });
});
