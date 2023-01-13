import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';

import { MenubarModule } from 'primeng/menubar';

import { NavMenuComponent } from './nav-menu.component';

describe('NavMenuComponent', () => {
  beforeEach(() => MockBuilder(NavMenuComponent, [MenubarModule]));

  it('should create', () => {
    MockRender(NavMenuComponent);
    expect(ngMocks.findAll(NavMenuComponent)[0]).toBeTruthy();
  });
});
