import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { User } from '../models/user';

@Injectable()
export class UserService {

  // for development
  // publicApiUrl = 'http://localhost:8080/api-public/users';
  // authApiUrl = 'http://localhost:8080/api/users';
  // for production
  publicApiUrl = '/api-public/users';
  authApiUrl = '/api/users';
  headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  createUser(user: User): Promise<User> {
    return this.http
      .post(this.publicApiUrl, JSON.stringify(user), { headers: this.headers })
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
