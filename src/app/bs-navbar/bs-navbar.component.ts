import { Component } from '@angular/core';
import { getAuth, signOut } from 'firebase/auth';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
})
export class BsNavbarComponent {
  private auth;
  constructor() {
    this.auth = getAuth();
  }
  logout() {
    this.auth = getAuth();
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
