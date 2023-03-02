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

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let body = {username: "username", password: "Username123."}

  beforeEach(async () => {
    return MockBuilder(LoginComponent, [
      RouterModule,
      ReactiveFormsModule,
      PasswordModule,
      ButtonModule,
      CardModule,
      MessagesModule,
    ]).mock(AuthService, {
        login: (_loginform: AbstractControl) => {
          return of(new HttpResponse({status: 200, body: body} ))
        }
      }
    ).keep(FormBuilder, { export: true });
  });

  it('should create', () => {
    MockRender(LoginComponent)
    expect(ngMocks.findAll(LoginComponent)[0]).toBeTruthy();
  });
});
