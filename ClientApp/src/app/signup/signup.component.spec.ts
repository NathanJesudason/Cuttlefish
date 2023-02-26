import { HttpResponse } from '@angular/common/http';
import { AbstractControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { of } from 'rxjs';
import { AuthService } from '../server-api/auth.service';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let body = {message: 'string'}

  beforeEach(async () => {
    return MockBuilder(SignupComponent, [ReactiveFormsModule]).mock(
      AuthService,{
        signUp: (_loginform: AbstractControl) => {
          return of(new HttpResponse({status: 200, body: body} ))
        }
      } 
    ).keep(FormBuilder, { export: true });
  });

  it('should create', () => {
    MockRender(SignupComponent)
    expect(ngMocks.findAll(SignupComponent)[0]).toBeTruthy();
  });
});
