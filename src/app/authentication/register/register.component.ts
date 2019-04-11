import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private registerService: RegisterService) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl(null),
      email: new FormControl(null),
      password: new FormControl(null),
      rePassword: new FormControl(null)
    });
  }

  onRegisterButtonClicked() {
    const { email, name, password } = this.registerForm.value;
    console.log(name, email, password);
    return this.registerService
      .register({ name, email, password })
      .subscribe(response => console.log(response));
  }
}
