import { FormsModule } from '@angular/forms';

import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';

import { InplaceModule } from 'primeng/inplace';
import { ToastModule } from 'primeng/toast';

import { ProjectData } from 'src/types/project';

import { FundsInplaceComponent } from './funds-inplace.component';

describe('FundsInplaceComponent', () => {
  const data: ProjectData = {
    id: 12345,
    name: 'Project Name',
    color: '#234001',
    description: 'This is the project description',
    endDate: new Date(),
    funds: 49.95,
    sprints: [],
  };

  beforeEach(() => MockBuilder(FundsInplaceComponent, [InplaceModule, FormsModule, ToastModule]));

  it('should create', () => {
    MockRender(FundsInplaceComponent, {projectData: data});
    expect(ngMocks.findAll(FundsInplaceComponent)[0]).toBeTruthy();
  });

  it('should have correct inplace structure', () => {
    MockRender(FundsInplaceComponent, {projectData: data});

    const inplace = ngMocks.find('p-inplace');
    expect(inplace).withContext('primeng\'s inplace HTML element exists').toBeTruthy();
  });
});
