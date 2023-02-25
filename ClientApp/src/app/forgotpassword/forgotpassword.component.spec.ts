import { HttpResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBuilder, MockRender, ngMocks, NG_MOCKS_ROOT_PROVIDERS } from 'ng-mocks';
import { of } from 'rxjs';
import { AppModule } from '../app.module';
import { AuthService } from '../server-api/auth.service';

import { ForgotpasswordComponent } from './forgotpassword.component';

describe('ForgotpasswordComponent', () => {
  let component: ForgotpasswordComponent;
  let fixture: ComponentFixture<ForgotpasswordComponent>;

  let res = " "
  beforeEach(async () => {
    return MockBuilder([ForgotpasswordComponent, RouterModule, RouterTestingModule.withRoutes([]), NG_MOCKS_ROOT_PROVIDERS, FormBuilder], AppModule).mock(
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
    MockRender(ForgotpasswordComponent)
    expect(ngMocks.findAll(ForgotpasswordComponent)[0]).toBeTruthy();
  });
});
