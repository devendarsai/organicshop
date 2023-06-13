import { Component } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { getAuth, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { FacebookAuthProvider } from 'firebase/auth';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private auth;
  constructor() {
    this.auth = getAuth();
  }

  login() {
    this.auth = getAuth();
    console.log('login');
    const provider = new GoogleAuthProvider();
    signInWithRedirect(this.auth, provider);
  }
  fblogin() {
    console.log('login');
    const provider = new FacebookAuthProvider();
    signInWithRedirect(this.auth, provider);
    console.log('login done');
  }
}
