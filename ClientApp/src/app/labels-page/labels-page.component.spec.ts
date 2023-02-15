import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';

import { LabelsPageComponent } from './labels-page.component';

describe('LabelsPageComponent', () => {
  beforeEach(() => {
    return MockBuilder(LabelsPageComponent);
  });

  it('should create', () => {
    MockRender(LabelsPageComponent);
    expect(ngMocks.findAll(LabelsPageComponent)[0]).toBeTruthy();
  });
});
