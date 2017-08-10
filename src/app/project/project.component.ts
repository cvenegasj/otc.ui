import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HomepageSharedService } from '../pages/homepage/homepage-shared.service';

import { Project } from '../models/project';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: [ './project.component.scss' ]
})
export class ProjectComponent implements OnInit, OnDestroy {

  project: Project;

  constructor(
    private homepageSharedService: HomepageSharedService,
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.homepageSharedService.setIsInfoPanelVisible(true);
    this.route.params
      .switchMap((params: Params) => this.projectService.getProject(+params['id']))
      .subscribe(project => this.project = project);
  }

  closePanel() {
    this.homepageSharedService.setIsInfoPanelVisible(false);
  }

  ngOnDestroy() {
    this.homepageSharedService.setIsInfoPanelVisible(false);
  }

}
