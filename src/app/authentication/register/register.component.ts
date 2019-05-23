import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private registerService: RegisterService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl(null),
      email: new FormControl(null),
      password: new FormControl(null),
      rePassword: new FormControl(null)
    });
  }

  onRegisterButtonClicked(): any {
    const { email, name, password, rePassword } = this.registerForm.value;
    if (password === rePassword) {
      return this.registerService
        .register({ name, email, password })
        .subscribe(response => {
          console.log(response);
          this.route.navigate(['dashboard/home']);
        });
    }
    console.log(password, rePassword);
    return null;
  }
}
