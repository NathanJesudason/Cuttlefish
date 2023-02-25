import { HttpResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBuilder, MockRender, ngMocks, NG_MOCKS_ROOT_PROVIDERS } from 'ng-mocks';
import { of } from 'rxjs';
import { AppModule } from '../app.module';
import { AuthService } from '../server-api/auth.service';

import { ResetPasswordComponent } from './reset-password.component';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let email = "email@none.com"

  beforeEach(async () => {
    return MockBuilder([ResetPasswordComponent, RouterModule, RouterTestingModule.withRoutes([]), NG_MOCKS_ROOT_PROVIDERS, FormBuilder], AppModule).mock(
      AuthService,{
        login: (_loginform: AbstractControl) => {
          return of(new HttpResponse({status: 200, body: email} ))
        }
      } 
    ).keep(
      FormBuilder
    )
  });

  it('should create', () => {
    MockRender(ResetPasswordComponent)
    expect(ngMocks.findAll(ResetPasswordComponent)[0]).toBeTruthy();
  });
  
});
