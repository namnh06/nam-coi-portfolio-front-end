import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  redirectUrl: string;
  constructor() {}
  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      const token = localStorage.getItem('np.token');
      if (token && !!token) {
        this.login();
      } else {
        this.logout();
      }
      resolve(this.isLoggedIn);
    });
    return promise;
  }

  login(): void {
    this.isLoggedIn = true;
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
