import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanLoad, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuardService implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard/home']);
      return false;
    }
    return true;
  }

  canLoad(): boolean {
    return this.authService.isAuthenticated()
      ? this.router.navigate(['/dashboard/home']) && false
      : true;
  }
}
