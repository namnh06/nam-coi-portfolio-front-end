import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { CreateUserInput } from './sign-up.service';
export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}
@Injectable({ providedIn: 'root' })
export class RegisterService {
  constructor(private apollo: Apollo) { }

  register({ name, email, password }) {
    const register = gql`
      mutation createUser($user: CreateUserInput) {
        createUser(CreateUserInput: $user) {
          _id
          name
          email
        }
      }
    `;

    return this.apollo.mutate({
      mutation: register,
      variables: {
        user: {
          name,
          email,
          password
        }
      }
    });
  }
}
