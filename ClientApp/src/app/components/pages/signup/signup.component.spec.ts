import { HttpResponse } from '@angular/common/http';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule
} from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  MockBuilder,
  MockRender,
  ngMocks
} from 'ng-mocks';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';

import { of } from 'rxjs';

import { AuthService } from 'src/app/services/auth/auth.service';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let body = {message: 'string'}

  beforeEach(async () => {
    return MockBuilder(SignupComponent, [
      RouterModule,
      ReactiveFormsModule,
      PasswordModule,
      ButtonModule,
      CardModule,
      MessagesModule,
    ]).mock(AuthService, {
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
