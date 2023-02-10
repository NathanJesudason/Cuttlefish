import { FacebookLoginProvider, SocialAuthService, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { FbLoginComponent } from '../login/fb-login/fb-login.component';

import { TokenInterceptor } from './token.interceptor';

describe('TokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TokenInterceptor,
      HttpClient,
      HttpHandler,
      FbLoginComponent,
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
      },
      FormBuilder,
      ]
  }));

  it('should be created', () => {
    const interceptor: TokenInterceptor = TestBed.inject(TokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
