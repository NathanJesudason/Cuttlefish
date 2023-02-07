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

import { CreateTaskModalComponent } from './create-task-modal.component';

describe('CreateTaskModalComponent', () => {
  beforeEach(() => {
    return MockBuilder(CreateTaskModalComponent, [
      DialogModule, 
      ButtonModule, 
      ToastModule, 
      CheckboxModule, 
      FormsModule, 
      CalendarModule
    ]);
  });

  it('should create', () => {
    MockRender(CreateTaskModalComponent);
    expect(ngMocks.findAll(CreateTaskModalComponent)[0]).toBeTruthy();
  });
});
