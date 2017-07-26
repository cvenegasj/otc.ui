import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Project } from '../project/project';

const PROJECTS: Project[] = [
  new Project(21, 'Parque Manhattan', 'Estrategia promovida por el observatorio ciudadano Lima Cómo Vamos', 5,
    'en proceso - faltan 5 días', 'Colectivo Perú', '2 meses aprox.'),
  new Project(22, 'Fab Lab Digitoys', 'Laboratorio de Fabricación digital creativo para niños.', 5,
    'en proceso - faltan 16 días', 'Henry Sánchez', '3 meses'),
  new Project(23, 'Open BioFab', 'Bio laboratorio comunitario para acerca la ciencia al ciudadano.', 5,
    'en proceso - faltan 20 días', 'Carlos Venegas', '2 meses')
];

@Injectable()
export class ProjectService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private projectsUrl = 'api/projects';  // URL to web api

  constructor(private http: Http) { }

  getProjects(): Promise<Project[]> {
    return this.http.get(this.projectsUrl)
      .toPromise()
      .then(response => response.json().data as Project[])
      .catch(this.handleError);
  }

  getProject(id: number): Promise<Project> {
    const url = `${this.projectsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Project)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
