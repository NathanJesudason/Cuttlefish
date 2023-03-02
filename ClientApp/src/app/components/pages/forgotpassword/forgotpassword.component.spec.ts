import { HttpResponse } from '@angular/common/http';
import { ComponentFixture } from '@angular/core/testing';
import {
  AbstractControl,
  FormBuilder
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import {
  MockBuilder,
  MockRender,
  ngMocks,
  NG_MOCKS_ROOT_PROVIDERS
} from 'ng-mocks';

import { of } from 'rxjs';

import { AppModule } from 'src/app/app.module';
import { AuthService } from 'src/app/services/auth/auth.service';

import { ForgotPasswordComponent } from './forgotpassword.component';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  let res = " "
  beforeEach(async () => {
    return MockBuilder([ForgotPasswordComponent, RouterModule, RouterTestingModule.withRoutes([]), NG_MOCKS_ROOT_PROVIDERS, FormBuilder], AppModule).mock(
      AuthService,{
        login: (_loginform: AbstractControl) => {
          return of(new HttpResponse({status: 200, body: res} ))
        }
      } 
    ).keep(
      FormBuilder
    )
  });

  it('should create', () => {
    MockRender(ForgotPasswordComponent)
    expect(ngMocks.findAll(ForgotPasswordComponent)[0]).toBeTruthy();
  });
});
