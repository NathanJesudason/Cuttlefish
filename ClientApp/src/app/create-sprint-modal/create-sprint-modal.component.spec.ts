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
});
