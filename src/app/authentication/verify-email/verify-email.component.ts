import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Auth } from 'aws-amplify';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  verifyEmailForm = new FormGroup({
    email: new FormControl(''),
    verifyCode: new FormControl('')
  });

  constructor() { }

  ngOnInit() {
  }

  onVerifyCodeSubmit() {
    if (this.verifyEmailForm.invalid) {
      return;
    }
    // console.log(this.verifyEmailForm);
    const email = this.verifyEmailForm.value.email;
    const verifyCode = this.verifyEmailForm.value.verifyCode;
    console.log(email, verifyCode);
    Auth.confirmSignUp(email, verifyCode)
      .then(response => console.log(response))
      .catch(error => console.log(error));

  }

}
