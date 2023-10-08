import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
  User,
} from 'firebase/auth';
import { Observable, of, switchMap } from 'rxjs';
import { UserService } from './user.service';
import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User | null>;
  constructor(
    private auth: Auth,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.auth = getAuth();
    this.user$ = new Observable((observer) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          console.log('user is signed in');
          observer.next(user);
        }
      });
    });
  }

  login() {
    console.log('Google login');
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    const provider = new GoogleAuthProvider();
    signInWithRedirect(this.auth, provider);
    console.log('login done');
  }

  fblogin() {
    console.log('Facebook login');
    const provider = new FacebookAuthProvider();
    signInWithRedirect(this.auth, provider);
    console.log('login done');
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

  get appUser$(): Observable<AppUser | null> {
    return this.user$.pipe(
      switchMap((user) => {
        if (user) {
          console.log('user', user);
          return this.userService.getAppUser(user.uid);
        }
        return of(null);
      })
    );
  }
}
