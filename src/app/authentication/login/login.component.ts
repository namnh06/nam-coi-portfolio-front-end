import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from './login.service';
import { Credentials } from '../models/auth-data.model';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  token: string;
  private querySubscription: Subscription;
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null)
    });
  }

  onSubmit(): void {
    const credentials: Credentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    this.querySubscription = this.loginService
      .login(credentials)
      .subscribe((response: any) => {
        if (!!response.data.login.token) {
          this.token = response.data.login.token;
          localStorage.setItem('np.token', this.token);
          this.router.navigate(['/dashboard/home']);
        }
      });
  }

  ngOnDestroy(): void {
    // this.querySubscription.unsubscribe();
  }
}
