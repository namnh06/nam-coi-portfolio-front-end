import { Injectable } from '@angular/core';
import { Router, CanActivate, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/authentication/login']);
      return false;
    }
    return true;
  }

  canLoad(): boolean {
    return !this.authService.isAuthenticated()
      ? this.router.navigate(['/authentication/login']) && false
      : true;
  }
}
