import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider } from "@abacritt/angularx-social-login";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-fb-login',
  templateUrl: './fb-login.component.html',
  styleUrls: ['./fb-login.component.css']
})
export class FbLoginComponent implements OnInit {

  myForm!: FormGroup 
  user!: SocialUser
  isSignedin: boolean = !!null

  constructor(private authService: SocialAuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });   
    
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user);
      this.isSignedin = (user != null);
      console.log(this.user);
      console.log(`hello ${this.isSignedin}`);

    });
  }

  signInWithFB(): void{
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
  }

  signOut(): void{
    this.authService.signOut();
  }

 

}
