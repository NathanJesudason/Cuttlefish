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
});
