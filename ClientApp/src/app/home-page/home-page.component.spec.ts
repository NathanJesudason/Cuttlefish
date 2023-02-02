import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';

import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {

  beforeEach(() => {
    return MockBuilder(HomePageComponent);
  });

  it('should create', () => {
    MockRender(HomePageComponent);
    expect(ngMocks.findAll(HomePageComponent)[0]).toBeTruthy();
  });
});
