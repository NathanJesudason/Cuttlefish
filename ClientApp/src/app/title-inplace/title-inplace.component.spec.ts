import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';

import { TitleInplaceComponent } from './title-inplace.component';

describe('TitleInplaceComponent', () => {
  beforeEach(() => MockBuilder(TitleInplaceComponent));

  it('should create', () => {
    MockRender(TitleInplaceComponent);
    expect(ngMocks.findAll(TitleInplaceComponent)[0]).toBeTruthy();
  });
});
