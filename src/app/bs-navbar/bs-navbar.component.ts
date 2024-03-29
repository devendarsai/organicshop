import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { Router } from '@angular/router';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
})
export class BsNavbarComponent {
  appUser!: AppUser | null;
  constructor(private auth: AuthService, private router: Router) {
    auth.appUser$.subscribe((appUser) => (this.appUser = appUser));
    console.log('appUser', this.appUser);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
