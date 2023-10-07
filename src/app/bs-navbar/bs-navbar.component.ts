import { Component } from '@angular/core';
import { User, getAuth, signOut } from 'firebase/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
})
export class BsNavbarComponent {
  private auth;
  user$: Observable<User | null>;
  constructor() {
    this.auth = getAuth();
    this.user$ = new Observable((observer) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          console.log('user is signed in');
          observer.next(user);
        } else {
          console.log('user is signed out');
          observer.next(null);
        }
      });
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
