import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { CreateUserInput } from './register.service';
export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}
@Injectable()
export class RegisterService {
  constructor(private apollo: Apollo) {}

  register({ name, email, password }) {
    console.log(name, email, password);
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
