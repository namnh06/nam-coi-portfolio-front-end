import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Credentials } from '../models/auth-data.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { HttpClient } from '@angular/common/http';
import { LoaderSpinnerService } from 'src/app/services/loader-spinner.service';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { min } from 'rxjs/operators';
import { AwsCognitoService } from 'src/app/services/aws-cognito.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  token: string;
  togglePassword = true;
  signInForm: FormGroup;
  formInvalid: boolean;
  private querySubscription: Subscription;
  constructor(
    private router: Router,
    private http: HttpClient,
    private loaderSpinnerService: LoaderSpinnerService,
    private fb: FormBuilder,
    private awsCognitoService: AwsCognitoService) { }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      userName: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.min(8)]]
    })
  }

  onSignInSubmitted(): void {
    if (this.signInForm.invalid) {
      this.formInvalid = true;
      return;
    }
    const { userName: username, password } = this.signInForm.value;
    this.awsCognitoService.signIn(username, password);
  }

  ngOnDestroy(): void {
  }
}
