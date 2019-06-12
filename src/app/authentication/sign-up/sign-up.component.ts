import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { LoaderSpinnerService } from 'src/app/services/loader-spinner.service';
import { AwsCognitoService } from 'src/app/services/aws-cognito.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  togglePassword = true;
  signUpForm: FormGroup;
  constructor(
    private router: Router,
    private loaderSpinnerService: LoaderSpinnerService,
    private fb: FormBuilder,
    private awsCognitoService: AwsCognitoService
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      userName: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.min(8)]]
    })
  }

  onSignUpSubmitted(): void {

    if (this.signUpForm.invalid) {
      return;
    }
    const { userName: username, password } = this.signUpForm.value;
    this.awsCognitoService.signUp(username, password);
  }
}
