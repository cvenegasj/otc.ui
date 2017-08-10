import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Dateo } from '../models/dateo';

import 'rxjs/add/operator/toPromise';
import { AuthService } from './auth.service';

@Injectable()
export class DateoService {

  // for development
  // publicApiUrl = 'http://localhost:8080/api-public/dateos';
  // authApiUrl = 'http://localhost:8080/api/dateos';
  // for production
  publicApiUrl = '/api-public/dateos';
  authApiUrl = '/api/dateos';

  constructor(
    private http: Http,
    private authHttp: AuthHttp
) { }

  getDateos(): Promise<Dateo[]> {
    return this.http.get(this.publicApiUrl)
      .toPromise()
      .then(response => response.json() as Dateo[])
      .catch(this.handleError);
  }

  getDateo(idDateo: number): Promise<Dateo> {
    const url = `${this.publicApiUrl}/${idDateo}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Dateo)
      .catch(this.handleError);
  }

  createDateo(dateo: Dateo): Promise<Dateo> {
    return this.authHttp
      .post(this.authApiUrl, JSON.stringify(dateo))
      .toPromise()
      .then(response => response.json() as Dateo)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
