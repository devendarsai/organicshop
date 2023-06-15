import { Component } from '@angular/core';
import { getAuth, signOut } from 'firebase/auth';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
})
export class BsNavbarComponent {
  private auth;
  user: any = null;
  constructor() {
    this.auth = getAuth();
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log('user is signed in');
        this.user = user;
        // ...
      } else {
        // User is signed out
        // ...
        console.log('user is signed out');
        this.user = null;
      }
    });
  }
  logout() {
    signOut(this.auth)
      .then(() => {
        // Sign-out successful.
        console.log('logout successful');
      })
      .catch((error) => {
        // An error happened.
        console.log('logout error', error);
      });
  }
}
