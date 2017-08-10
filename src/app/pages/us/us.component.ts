import {Component, OnInit, OnDestroy} from '@angular/core';
import { HomepageSharedService } from '../homepage/homepage-shared.service';

@Component({
  selector: 'app-us',
  templateUrl: './us.component.html',
  styleUrls: [ './us.component.scss' ]
})
export class UsComponent implements OnInit, OnDestroy {

  constructor(
    private homepageSharedService: HomepageSharedService
  ) { }


  closePanel() {
    this.homepageSharedService.setIsInfoPanelVisible(false);
  }

  ngOnInit() {
    this.homepageSharedService.setIsInfoPanelVisible(true);
  }

  ngOnDestroy() {
    this.homepageSharedService.setIsInfoPanelVisible(false);
  }

}
