import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
@Injectable()
export class LoginService {
  constructor(private http: HttpClient, private apollo: Apollo) {}

  login(credentials) {
    const email = credentials.email;
    const password = credentials.password;

    const Login = gql`
      query login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          userId
          token
        }
      }
    `;

    return this.apollo.watchQuery({
      query: Login,
      variables: {
        email: email,
        password: password
      }
    }).valueChanges;
  }
}
