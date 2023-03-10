import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLabelModalComponent } from './create-label-modal.component';

describe('CreateLabelModalComponent', () => {
  let component: CreateLabelModalComponent;
  let fixture: ComponentFixture<CreateLabelModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLabelModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLabelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
