import { FacebookLoginProvider, SocialAuthService, SocialAuthServiceConfig, SocialUser } from '@abacritt/angularx-social-login';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { of } from 'rxjs';
import { HomePageComponent } from 'src/app/home-page/home-page.component';

import { FbLoginComponent } from './fb-login.component';

describe('FbLoginComponent', () => {
  let component: FbLoginComponent;
  let fixture: ComponentFixture<FbLoginComponent>;

  beforeEach(async () => {
    return MockBuilder(FbLoginComponent).provide(
      {
        provide: 'SocialAuthServiceConfig',
        useValue: {
          autoLogin: false,
          providers: [
            // {
            //   id: GoogleLoginProvider.PROVIDER_ID,
            //   provider: new GoogleLoginProvider('')
            // },
            {
              id: FacebookLoginProvider.PROVIDER_ID,
              provider: new FacebookLoginProvider('')
            }
          ],
          onError: (err: any)=> {
            console.log(err);
          }
        } as SocialAuthServiceConfig,
      }
    ).mock(SocialAuthService, {
      authState: of(new SocialUser())
    } as Partial <SocialAuthService>)


  })


  it('should create', () => {
    MockRender(FbLoginComponent);
    expect(ngMocks.findAll(FbLoginComponent)[0]).toBeTruthy();
  });
});
