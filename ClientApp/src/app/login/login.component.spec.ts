import { HttpResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { of } from 'rxjs';
import { AuthService } from '../server-api/auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let body = {username: "username", password: "Username123."}

  beforeEach(async () => {
    return MockBuilder(LoginComponent).mock(
      AuthService,{
        login: (_loginform: AbstractControl) => {
          return of(new HttpResponse({status: 200, body: body} ))
        }
      } 
    ).keep(
      FormBuilder
    )
  });

  it('should create', () => {
    MockRender(LoginComponent)
    expect(ngMocks.findAll(LoginComponent)[0]).toBeTruthy();
  });
});
