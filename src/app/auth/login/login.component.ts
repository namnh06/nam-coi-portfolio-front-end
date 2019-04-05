import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null)
    });
  }

  async onSubmit() {
    const credentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    const data = await this.loginService
      .login(credentials)
      .subscribe(response => {
        console.log(response.data);
        return response.data;
      });
  }
}
