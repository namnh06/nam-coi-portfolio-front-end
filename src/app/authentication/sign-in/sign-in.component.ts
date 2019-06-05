import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from './sign-in.service';
import { Credentials } from '../models/auth-data.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  signInForm: FormGroup;
  token: string;
  private querySubscription: Subscription;
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      username: new FormControl(null),
      password: new FormControl(null)
    });
  }

  onSubmit(): void {
    const { username, password } = this.signInForm.value;
    Auth.signIn({
      username,
      password,
    }).then(user => console.log(user))
      .catch(err => console.log(err));
  }

  ngOnDestroy(): void {
  }
}
