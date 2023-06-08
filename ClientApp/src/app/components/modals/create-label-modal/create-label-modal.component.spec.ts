import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLabelModalComponent } from './create-label-modal.component';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ColorPickerModule } from 'primeng/colorpicker';
import { LabelsPageComponent } from '../../pages/labels-page/labels-page.component';

describe('CreateLabelModalComponent', () => {

  beforeEach(async () => {
    return MockBuilder(CreateLabelModalComponent, [ButtonModule, DialogModule, InputTextModule, ColorPickerModule] ).mock(LabelsPageComponent,{
      export: true
    })
  });

  it('should create', () => {
    MockRender(CreateLabelModalComponent)
    expect(ngMocks.findAll(CreateLabelModalComponent)[0]).toBeTruthy();
  });
});
