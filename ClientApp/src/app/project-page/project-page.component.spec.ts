import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';
import { AccordionModule } from 'primeng/accordion';

import { ProjectPageComponent } from './project-page.component';

describe('ProjectPageComponent', () => {
  beforeEach(() => MockBuilder(ProjectPageComponent, AccordionModule));

  it('should create', () => {
    MockRender(ProjectPageComponent);
    expect(ngMocks.findAll(ProjectPageComponent)[0]).toBeTruthy();
  });

  // if we ever put anything in the projectpage besides a single accordion, add more unit tests for that
});
