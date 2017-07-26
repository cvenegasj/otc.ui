import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Project } from '../../project/project';

@Injectable()
export class HomepageSharedService {

  // Observable string sources
  private selectedProjectSource = new Subject<Project>();

  // Observable string streams
  selectedProject$ = this.selectedProjectSource.asObservable();

  selectProject(project: Project) {
    this.selectedProjectSource.next(project);
  }
}
