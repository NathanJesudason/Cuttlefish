import { FormsModule } from '@angular/forms';

import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';

import { ColorPickerModule } from 'primeng/colorpicker';
import { ToastModule } from 'primeng/toast';

import { ProjectData } from 'src/types/project';

import { ColorInplaceComponent } from './color-inplace.component';

describe('ColorInplaceComponent', () => {
  const data: ProjectData = {
    id: 12345,
    name: 'Project Name',
    color: '#234001',
    description: 'This is the project description',
    endDate: new Date(),
    funds: 49.95,
    sprints: [],
    startDate: new Date()
  };
  
  beforeEach(() => MockBuilder(ColorInplaceComponent, [ColorPickerModule, ToastModule, FormsModule]));

  it('should create', () => {
    MockRender(ColorInplaceComponent, {projectData: data});
    expect(ngMocks.findAll(ColorInplaceComponent)[0]).toBeTruthy();
  });

  it('should have correct inplace structure', () => {
    MockRender(ColorInplaceComponent, {projectData: data});

    const colorpicker = ngMocks.find('p-colorpicker');
    expect(colorpicker).withContext('primeng\'s colorpicker HTML element exists').toBeTruthy();
  });
});
