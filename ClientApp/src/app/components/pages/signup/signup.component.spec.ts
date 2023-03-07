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

  it('should validate passwords correctly', () => {
    const fixture = MockRender(SignupComponent);
    const component = fixture.point.componentInstance;

    const pw1 = 'Password1';
    const cpw1 = 'Password1!';
    expect(component.verifySignUpForm(pw1, cpw1)).withContext('catch when passwords are different').toBeFalse();

    const pw2 = 'P*4c';
    const cpw2 = 'P*4c';
    expect(component.verifySignUpForm(pw2, cpw2)).withContext('catch when passwords are too short').toBeFalse();

    const pw3 = 'Password1';
    const cpw3 = 'Password1';
    expect(component.verifySignUpForm(pw3, cpw3)).withContext('catch when passwords don\'t have a special character').toBeFalse();

    const pw4 = 'Password!';
    const cpw4 = 'Password!';
    expect(component.verifySignUpForm(pw4, cpw4)).withContext('catch when passwords don\'t have a number').toBeFalse();

    const pw5 = 'password1!';
    const cpw5 = 'password1!';
    expect(component.verifySignUpForm(pw5, cpw5)).withContext('catch when passwords don\'t have an uppercase letter').toBeFalse();

    const pw6 = 'Password1!';
    const cpw6 = 'Password1!';
    expect(component.verifySignUpForm(pw6, cpw6)).withContext('verify valid passwords').toBeTrue();
  });
});
