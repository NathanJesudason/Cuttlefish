/**
 * Testing for CreateSprintModalComponent
 */

import { FormsModule } from '@angular/forms';

import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';

import { CreateSprintModalComponent } from './create-sprint-modal.component';

describe('CreateSprintModalComponent', () => {
  beforeEach(() => {
    return MockBuilder(CreateSprintModalComponent, [
      DialogModule, 
      ButtonModule, 
      ToastModule, 
      CheckboxModule, 
      FormsModule, 
      CalendarModule
    ]);
  });

  it('should create', () => {
    MockRender(CreateSprintModalComponent);
    expect(ngMocks.findAll(CreateSprintModalComponent)[0]).toBeTruthy();
  });

  it('should be bound with visibility variable', () => {
    const fixture = MockRender(CreateSprintModalComponent);
    const component = fixture.point.componentInstance;

    const modal = ngMocks.find('p-dialog');
    expect(modal).withContext('primeng dialog element exists').toBeTruthy();

    component.showCreateSprintModal();
    fixture.detectChanges();

    const visibilityVar = ngMocks.input(modal, 'visible');
    expect(visibilityVar).withContext('modal visibility bound with createSprintModalShown').toBe(component.createSprintModalShown);
  });

  it('should show and hide modal programmatically', () => {
    const fixture = MockRender(CreateSprintModalComponent);
    const component = fixture.point.componentInstance;

    const modal = ngMocks.find('p-dialog');
    expect(modal).withContext('primeng dialog element exists').toBeTruthy();

    expect(component.createSprintModalShown).withContext('modal is hidden by default').toBeFalse();

    component.showCreateSprintModal();
    fixture.detectChanges();

    expect(component.createSprintModalShown).withContext('modal is shown after showCreateSprintModal()').toBeTrue();

    component.hideCreateSprintModal();
    fixture.detectChanges();

    expect(component.createSprintModalShown).withContext('modal is hidden after hideCreateSprintModal()').toBeFalse();
  });
});
