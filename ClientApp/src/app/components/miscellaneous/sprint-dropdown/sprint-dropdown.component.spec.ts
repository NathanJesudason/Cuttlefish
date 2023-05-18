import { FormsModule } from '@angular/forms';

import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';

import { AccordionModule } from 'primeng/accordion';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';

import { SprintData } from 'src/types/sprint';
import { CreateTaskModalComponent } from 'src/app/components/modals/create-task-modal/create-task-modal.component';
import { SprintDropdownComponent } from './sprint-dropdown.component';
import { DateInplaceComponent } from 'src/app/components/inplaces/date-inplace/date-inplace.component';
import { DescriptionInplaceComponent } from 'src/app/components/inplaces/description-inplace/description-inplace.component';
import { NgApexchartsModule } from 'ng-apexcharts';


describe('SprintDropdownComponent', () => {
  const data: SprintData = {
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
      comments: [],
    }],
  };
  
  beforeEach(() => {
    return MockBuilder(SprintDropdownComponent, [
      AccordionModule,
      ConfirmDialogModule,
      RadioButtonModule,
      DialogModule,
      DropdownModule,
      MenuModule,
      FormsModule,
      NgApexchartsModule,
      ToastModule,
    ])
      .mock(CreateTaskModalComponent, { export: true })
      .mock(DateInplaceComponent, { export: true })
      .mock(DescriptionInplaceComponent, { export: true });
  });
    

  it('should create', () => {
    MockRender(SprintDropdownComponent, { data: data });
    expect(ngMocks.findAll(SprintDropdownComponent)[0]).toBeTruthy();
  });

  it('should expand and collapse programmatically', () => {
    const fixture = MockRender(SprintDropdownComponent, { data: data });
    const component = fixture.point.componentInstance;

    const accordion = ngMocks.find('p-accordionTab');
    expect(accordion).withContext('a primeng accordionTab exists').toBeTruthy();
    expect(ngMocks.input(accordion, 'selected')).withContext('accordionTab uses !collapsed as its selected input').toBe(!component.collapsed);

    component.collapse();
    expect(component.collapsed).withContext('collapsing programmatically works').toBeTrue();

    component.expand();
    expect(component.collapsed).withContext('expanding programmatically works').toBeFalse();
  });

  it('should hide and unhide programmatically', () => {
    const fixture = MockRender(SprintDropdownComponent, { data: data });
    const component = fixture.point.componentInstance;

    let accordion = ngMocks.find('p-accordionTab');
    expect(accordion).withContext('a primeng accordionTab exists').toBeTruthy();
    
    component.hide();
    fixture.detectChanges();
    expect(component.hidden).withContext('hiding programmatically works').toBeTrue();
    expect(() => ngMocks.find('p-accordionTab')).withContext('accordionTab is no longer rendered after being hidden').toThrow();

    component.unhide();
    fixture.detectChanges();
    expect(component.hidden).withContext('unhiding programmatically works').toBeFalse();
    accordion = ngMocks.find('p-accordionTab');
    expect(accordion).withContext('accordionTab exists again after calling unhide()').toBeTruthy();
  });
});
