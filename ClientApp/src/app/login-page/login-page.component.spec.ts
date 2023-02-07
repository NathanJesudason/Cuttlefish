import { RouterModule } from '@angular/router';
import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';

import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
  beforeEach(() => {
    return MockBuilder(LoginPageComponent, [RouterModule]);
  });

  it('should create', () => {
    MockRender(LoginPageComponent);
    expect(ngMocks.findAll(LoginPageComponent)[0]).toBeTruthy();
  });
});
