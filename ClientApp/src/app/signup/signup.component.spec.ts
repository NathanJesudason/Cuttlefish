import { HttpResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { of } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../server-api/auth.service';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let body = {message: 'string'}

  beforeEach(async () => {
    return MockBuilder(SignupComponent).mock(
      AuthService,{
        signUp: (_loginform: AbstractControl) => {
          return of(new HttpResponse({status: 200, body: body} ))
        }
      } 
    ).keep(
      FormBuilder
    )
  });

  it('should create', () => {
    MockRender(SignupComponent)
    expect(ngMocks.findAll(SignupComponent)[0]).toBeTruthy();
  });
});
