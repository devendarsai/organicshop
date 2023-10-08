import { Injectable } from '@angular/core';
import { User, getAuth } from 'firebase/auth';
import {
  DataSnapshot,
  Database,
  getDatabase,
  onValue,
  ref,
  set,
  update,
} from 'firebase/database';
import { AppUser } from './models/app-user';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private db: Database;
  private auth = getAuth();
  constructor() {
    this.db = getDatabase();
    console.log('db', this.db);
  }
  save(user: User) {
    console.log('saving user', user);
    update(ref(this.db, 'users/' + user.uid), {
      name: user.displayName,
      email: user.email,
    });
    console.log('user saved');
  }
  // get the firebase user object as firebase object observable and save it to AppUser object
  getAppUser(uid: String): Observable<AppUser> {
    const userRef = ref(this.db, `/users/${uid}`);
    return new Observable((observer) => {
      onValue(userRef, (snapshot) => {
        const user = snapshot.val();
        console.log('user', user);
        observer.next({
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        });
      });
    });
  }
}
