import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentInplaceComponent } from './comment-inplace.component';

describe('CommentInplaceComponent', () => {
  let component: CommentInplaceComponent;
  let fixture: ComponentFixture<CommentInplaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentInplaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentInplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
