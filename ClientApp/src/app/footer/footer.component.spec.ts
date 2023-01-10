import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  beforeEach(() => MockBuilder(FooterComponent));

  it('should create', () => {
    MockRender(FooterComponent);
    expect(ngMocks.findAll(FooterComponent)[0]).toBeTruthy();
  });
});
