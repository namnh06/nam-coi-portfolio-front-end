import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RegisterService } from './sign-up.service';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  constructor(
    private registerService: RegisterService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      name: new FormControl(null),
      username: new FormControl(null),
      password: new FormControl(null),
      rePassword: new FormControl(null)
    });
  }

  onRegisterButtonClicked(): any {
    const { username, name, password, rePassword } = this.signUpForm.value;
    Auth.signUp({
      username,
      password,
    }).then(data => {
      console.log(data);
    }).catch(error => console.log(error));
    return null;
  }
}
