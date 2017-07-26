import { Component } from '@angular/core';

import { SidenavService } from '../shared/sidenav.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.scss' ]
})
export class NavBarComponent {

  constructor(private sidenavService: SidenavService) { }

  public toggleSidenav() {
    this.sidenavService
      .toggle()
      .then(() => { });
  }
}
