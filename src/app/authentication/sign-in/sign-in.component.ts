import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from './sign-in.service';
import { Credentials } from '../models/auth-data.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { HttpClient } from '@angular/common/http';
import { LoaderSpinnerService } from 'src/app/services/loader-spinner.service';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { min } from 'rxjs/operators';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  token: string;
  hide = true;
  private querySubscription: Subscription;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private http: HttpClient,
    private loaderSpinnerService: LoaderSpinnerService,
    private fb: FormBuilder) { }
  // signInForm = this.fb.group({
  //   userName: ['', Validators.required],
  //   password: ['', Validators.required, Validators.min(8)]
  // })
  signInForm: FormGroup;
  ngOnInit(): void {
    this.signInForm = this.fb.group({
      userName: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.min(8)]]
    })
  }

  onSubmit(): void {
    console.log(this.signInForm);
    if (this.signInForm.invalid) {
      return;
    }
    const username = this.signInForm.value.userName;
    const password = this.signInForm.value.password;

    this.loaderSpinnerService.show();
    Auth.signIn({
      username,
      password,
    }).then(user => {
      const token = user.signInUserSession.accessToken.jwtToken;
      localStorage.setItem('np.token', token);
      this.router.navigate(['dashboard/home']);
    })
      .catch(err => console.log(err))
      .finally(() => {
        this.loaderSpinnerService.hide();
      });
  }

  ngOnDestroy(): void {
  }
}
