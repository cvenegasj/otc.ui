import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Dateo } from '../../models/dateo';
import { Project } from '../../models/project';

@Injectable()
export class HomepageSharedService {

  // Observable string sources
  private selectedDateoSource = new Subject<Dateo>();
  private selectedProjectSource = new Subject<Project>();
  private isInfoPanelVisibleSource = new Subject<boolean>();

  // Observable string streams
  selectedDateo$ = this.selectedDateoSource.asObservable();
  selectedProject$ = this.selectedProjectSource.asObservable();
  isInfoPanelVisible$ = this.isInfoPanelVisibleSource.asObservable();

  selectDateo(dateo: Dateo) {
    this.selectedDateoSource.next(dateo);
  }

  selectProject(proposal: Project) {
    this.selectedProjectSource.next(proposal);
  }

  setIsInfoPanelVisible(isVisible: boolean) {
    this.isInfoPanelVisibleSource.next(isVisible);
  }

}
