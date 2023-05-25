/**
 * Test file for AuthGuard
 */

import { Location } from '@angular/common';
import {
  fakeAsync,
  tick
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  Router,
  RouterModule,
  RouterOutlet
} from '@angular/router';

import {
  MockBuilder,
  MockRender,
  ngMocks,
  NG_MOCKS_ROOT_PROVIDERS
} from 'ng-mocks';

import { AuthGuard } from './auth.guard';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginComponent } from 'src/app/components/pages/login/login.component';
import { ProjectsPageComponent } from 'src/app/components/pages/projects-page/projects-page.component';
import { AppModule } from 'src/app/app.module';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    return MockBuilder([AuthGuard,
      RouterModule,
      RouterTestingModule.withRoutes([]),
      NG_MOCKS_ROOT_PROVIDERS,],AppModule )
  });

  

  it('redirects to login', fakeAsync(()=>{

    const fixture = MockRender(RouterOutlet, {});
    const router: Router = fixture.point.injector.get(Router);
    const location: Location = fixture.point.injector.get(Location);

    // First we need to initialize navigation.
    if (fixture.ngZone) {
      fixture.ngZone.run(() => router.initialNavigation());
      tick(); // is needed for rendering of the current route.
    }
    expect(location.path()).toEqual('/')
    router.navigate(['login'])
    tick()
    expect(location.path()).toEqual('/login');
    expect(() => ngMocks.find(LoginComponent)).not.toThrow();
  }));

  it('loads dashboard', fakeAsync(() => {
    const fixture = MockRender(RouterOutlet, {});
    const router: Router = fixture.point.injector.get(Router);
    const location: Location = fixture.point.injector.get(Location);
    const loginService: AuthService =
      fixture.point.injector.get(AuthService);

    // Letting the guard know we have been logged in.
    // loginService.isUserLoggedIn = true;
    loginService.storeToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c')

    // First we need to initialize navigation.
    if (fixture.ngZone) {
      fixture.ngZone.run(() => router.initialNavigation());
      tick(); // is needed for rendering of the current route.
    }

    // Because now we are logged in, the guard should let us land on
    // the dashboard.
    expect(location.path()).toEqual('/');
    router.navigate(['projects'])
    tick()
    expect(location.path()).toEqual('/projects');
    expect(() => ngMocks.find(ProjectsPageComponent)).not.toThrow();

  }))
  
});
