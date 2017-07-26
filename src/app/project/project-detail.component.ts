import {
  Component, Input, OnInit, OnChanges, SimpleChanges, SimpleChange, EventEmitter, Output,
  OnDestroy
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProjectService } from '../shared/project.service';
import { HomepageSharedService } from '../pages/homepage/homepage-shared.service';

import { Project } from './project';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: [ './project-detail.component.scss' ]
})
export class ProjectDetailComponent implements OnInit, OnDestroy {

  project: Project;
  subscription: Subscription;

  constructor(
    private projectService: ProjectService,
    private homepageSharedService: HomepageSharedService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => console.log(params));

    this.subscription = homepageSharedService.selectedProject$.subscribe(project => { this.project = project; });
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.projectService.getProject(+params['id']))
      .subscribe(project => this.project = project);


    //this.projectService.getProject(this.idProject).then(project => this.project = project);
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  /*ngOnChanges(changes: SimpleChanges) {
    const idProject: SimpleChange = changes.idProject;
    //console.log('prev value: ', name.previousValue);
    //console.log('got name: ', name.currentValue);
    //this._name = name.currentValue.toUpperCase();
    this.idProject = idProject.currentValue;
    this.projectService.getProject(this.idProject).then(project => this.project = project);
  }*/
}
