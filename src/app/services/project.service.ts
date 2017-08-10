import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Project } from '../models/project';

@Injectable()
export class ProjectService {

  // for development
  // publicApiUrl = 'http://localhost:8080/api-public/projects';
  // authApiUrl = 'http://localhost:8080/api/projects';
  // for production
  publicApiUrl = '/api-public/projects';
  authApiUrl = '/api/projects';

  constructor(private http: Http, private authHttp: AuthHttp) { }

  getProjects(): Promise<Project[]> {
    return this.http.get(this.publicApiUrl)
      .toPromise()
      .then(response => response.json() as Project[])
      .catch(this.handleError);
  }

  getProject(idProject: number): Promise<Project> {
    const url = `${this.publicApiUrl}/${idProject}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Project)
      .catch(this.handleError);
  }

  createProject(project: Project): Promise<Project> {
    return this.authHttp
      .post(this.authApiUrl, JSON.stringify(project))
      .toPromise()
      .then(response => response.json() as Project)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
