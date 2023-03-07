import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';

import { ButtonModule } from 'primeng/button';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  beforeEach(() => MockBuilder(FooterComponent, [ButtonModule]));

  it('should create', () => {
    MockRender(FooterComponent);
    expect(ngMocks.findAll(FooterComponent)[0]).toBeTruthy();
  });
});
