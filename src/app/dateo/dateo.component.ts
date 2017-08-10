import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HomepageSharedService } from '../pages/homepage/homepage-shared.service';

import { Dateo } from '../models/dateo';
import { Subscription } from 'rxjs/Subscription';
import { DateoService } from '../services/dateo.service';

@Component({
  selector: 'app-dateo',
  templateUrl: './dateo.component.html',
  styleUrls: [ './dateo.component.scss' ]
})
export class DateoComponent implements OnInit, OnDestroy {

  dateo: Dateo;

  constructor(
    private homepageSharedService: HomepageSharedService,
    private dateoService: DateoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.homepageSharedService.setIsInfoPanelVisible(true);
    this.route.params
      .switchMap((params: Params) => this.dateoService.getDateo(+params['id']))
      .subscribe(dateo => this.dateo = dateo);
  }

  closePanel() {
    this.homepageSharedService.setIsInfoPanelVisible(false);
  }

  ngOnDestroy() {
    this.homepageSharedService.setIsInfoPanelVisible(false);
  }

}
