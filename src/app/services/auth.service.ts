import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

import { TOKEN_NAME, TOKEN_AUTH_PASSWORD, TOKEN_AUTH_USERNAME } from './app.constants';

@Injectable()
export class AuthService {

  // for development
  // AUTH_TOKEN_URL = 'http://localhost:8080/oauth/token';
  // for production
  AUTH_TOKEN_URL = '/oauth/token';

  jwtHelper: JwtHelper = new JwtHelper();
  accessToken: string;
  isAdmin: boolean;
  username: string;

  constructor(private http: Http) { }

  login(username: string, password: string) {
    const body = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&grant_type=password&client_id=otc`;

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD));

    return this.http.post(this.AUTH_TOKEN_URL, body, {headers})
      .map(res => res.json())
      .map((res: any) => {
        console.log(res);
        if (res.access_token) {
          return res.access_token;
        }
        return null;
      });
  }

  doAfterLogin(accessToken: string) {
    const decodedToken = this.jwtHelper.decodeToken(accessToken);
    console.log(decodedToken);

    this.username = decodedToken.user_name;
    this.isAdmin = decodedToken.authorities.some(el => el === 'ROLE_ADMIN_STRONG');
    this.accessToken = accessToken;

    localStorage.setItem('username', this.username);
    localStorage.setItem(TOKEN_NAME, accessToken);
  }

  logout() {
    this.isAdmin = false;
    localStorage.removeItem('username');
    localStorage.removeItem(TOKEN_NAME);
  }

  getToken() {
    return localStorage.getItem(TOKEN_NAME);
  }

  isAdminUser(): boolean {
    return this.isAdmin;
  }

  isUser(): boolean {
    return this.accessToken && !this.isAdmin;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(TOKEN_NAME) != null;
    // return tokenNotExpired();
  }

  getUsername(): string {
    return localStorage.getItem('username');
  }

}
