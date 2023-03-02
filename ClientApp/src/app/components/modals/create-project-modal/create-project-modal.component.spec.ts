import { FormsModule } from '@angular/forms';

import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';

import { CreateProjectModalComponent } from './create-project-modal.component';

describe('CreateProjectModalComponent', () => {
  beforeEach(() => {
    return MockBuilder(CreateProjectModalComponent, [
      DialogModule, 
      ButtonModule, 
      ToastModule, 
      FormsModule, 
      CalendarModule,
      ColorPickerModule,
    ]);
  });

  it('should create', () => {
    MockRender(CreateProjectModalComponent);
    expect(ngMocks.findAll(CreateProjectModalComponent)[0]).toBeTruthy();
  });

  it('should be bound with visibility variable', () => {
    const fixture = MockRender(CreateProjectModalComponent);
    const component = fixture.point.componentInstance;

    const modal = ngMocks.find('p-dialog');
    expect(modal).withContext('primeng dialog element exists').toBeTruthy();

    component.showCreateProjectModal();
    fixture.detectChanges();

    const visibilityVar = ngMocks.input(modal, 'visible');
    expect(visibilityVar).withContext('modal visibility bound with createProjectModalShown').toBe(component.createProjectModalShown);
  });

  it('should show and hide modal programmatically', () => {
    const fixture = MockRender(CreateProjectModalComponent);
    const component = fixture.point.componentInstance;

    const modal = ngMocks.find('p-dialog');
    expect(modal).withContext('primeng dialog element exists').toBeTruthy();

    expect(component.createProjectModalShown).withContext('modal is hidden by default').toBeFalse();

    component.showCreateProjectModal();
    fixture.detectChanges();

    expect(component.createProjectModalShown).withContext('modal is shown after showCreateProjectModal()').toBeTrue();

    component.hideCreateProjectModal();
    fixture.detectChanges();

    expect(component.createProjectModalShown).withContext('modal is hidden after hideCreateProjectModal()').toBeFalse();
  });
});
