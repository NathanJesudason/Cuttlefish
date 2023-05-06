import { FormsModule } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';

import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';

import {
  Inplace,
  InplaceModule
} from 'primeng/inplace';
import { ToastModule } from 'primeng/toast';

import { TitleInplaceComponent } from './title-inplace.component';
import { ProjectData } from 'src/types/project';

describe('TitleInplaceComponent', () => {
  const data: ProjectData = {
    id: 12345,
    name: 'Project Name',
    color: '#234001',
    description: 'This is the project description',
    endDate: new Date(),
    funds: 49.95,
    sprints: [{
      id: 234597,
      name: 'Sprint Name',
      goal: '',
      startDate: new Date(Date.parse('19 Jan 2023 00:00:00 GMT')),
      endDate: new Date(Date.parse('2 Feb 2023 00:00:00 GMT')),
      isCompleted: false,
      pointsAttempted: 0,
      pointsCompleted: 0,
      projectId: 1,
      isBacklog: false,
      tasks: [{
        id: 12345,
        sprintID: 0,
        priority: 0,
        type: "Epic",
        cost: 0,
        name: 'Task Name',
        assignee: 'Me',
        storyPoints: 3,
        description: 'Task Description',
        startDate: new Date(),
        endDate: new Date(),
        progress: 'Backlog',
        order: 0,
      }],
    }],
  };
  
  beforeEach(() => MockBuilder(TitleInplaceComponent, [InplaceModule, ToastModule, FormsModule, A11yModule]));

  it('should create', () => {
    MockRender(TitleInplaceComponent, {entityData: data});
    expect(ngMocks.findAll(TitleInplaceComponent)[0]).toBeTruthy();
  });

  it('should have correct inplace structure', () => {
    const fixture = MockRender(TitleInplaceComponent, {entityData: data});
    const component = fixture.point.componentInstance;

    const inplace = ngMocks.find('p-inplace');
    expect(inplace).withContext('primeng\'s inplace HTML element exists').toBeTruthy();
    expect(component.titleInplace).withContext('primeng\'s inplace is bound with @ViewChild').toEqual(jasmine.any(Inplace));
    
    const display = ngMocks.findTemplateRef(inplace, ['pTemplate', 'display']);
    expect(display).withContext('primeng\'s inplace is given pTemplate called display').toBeTruthy();
    ngMocks.render(inplace.componentInstance, display);
    expect(inplace.nativeElement.innerHTML).withContext('primeng\'s inplace contains original title on render').toContain(data.name);

    const content = ngMocks.findTemplateRef(inplace, ['pTemplate', 'content']);
    expect(content).withContext('primeng\'s inplace is given pTemplate called display').toBeTruthy();
    ngMocks.render(inplace.componentInstance, content);
    
    const input = ngMocks.find('input');
    const inputBoundValue = ngMocks.input(input, 'ngModel');
    expect(inputBoundValue).withContext('input is properly bound with ngModel').toBe(component.updatedTitle);
  });
});
