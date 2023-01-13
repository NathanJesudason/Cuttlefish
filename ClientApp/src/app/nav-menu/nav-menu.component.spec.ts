import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';

import { NavMenuComponent } from './nav-menu.component';

describe('NavMenuComponent', () => {
  beforeEach(() => MockBuilder(NavMenuComponent));

  it('should create', () => {
    MockRender(NavMenuComponent);
    expect(ngMocks.findAll(NavMenuComponent)[0]).toBeTruthy();
  });
});
