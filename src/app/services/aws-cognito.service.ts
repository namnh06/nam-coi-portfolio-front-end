import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';
import { LoaderSpinnerService } from './loader-spinner.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AwsCognitoService {

  constructor(
    private router: Router,
    private loaderSpinnerService: LoaderSpinnerService,
    private dialog: MatDialog) { }

  signIn(username, password) {
    // this.loaderSpinnerService.show();
    Auth.signIn({
      username,
      password,
    }).then(user => {
      const token = user.signInUserSession.accessToken.jwtToken;
      localStorage.setItem('np.token', token);
      this.router.navigate(['dashboard/home']);
    })
      .catch(error => {
        console.log(error);
        this.dialog.open(ErrorDialogComponent, {
          data: {
            message: error.message
          }
        });
        // return throwError(error);
      })
      .finally(() => {
        // this.loaderSpinnerService.hide();
      });
  }

  signUp(username, password) {
    this.loaderSpinnerService.show();
    Auth.signUp({
      username,
      password,
    }).then(data => {
      this.router.navigate(['authentication/sign-in']);
    }).catch(error => console.log(error))
      .finally(() => this.loaderSpinnerService.hide());
  }
}
