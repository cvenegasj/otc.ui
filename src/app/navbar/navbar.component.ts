import { Component } from '@angular/core';

import { SidenavService } from '../services/sidenav.service';
import { Router } from '@angular/router';
import { HomepageSharedService } from '../pages/homepage/homepage-shared.service';
import { AuthService } from '../services/auth.service';
import { MdDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.scss' ]
})
export class NavBarComponent {

  constructor(
    private sidenavService: SidenavService,
    private homepageSharedService: HomepageSharedService,
    private authService: AuthService,
    public dialog: MdDialog,
    private router: Router
  ) { }

  public toggleSidenav() {
    this.sidenavService
      .toggle()
      .then(() => { });
  }

  goToNosotros(): void {
    this.router.navigate(['/home/nosotros']);
    this.homepageSharedService.setIsInfoPanelVisible(true);
  }

  // ========== Login stuff ==========

  openLoginFormDialog(): void {
    this.dialog.open(LoginComponent);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  get isAdminUser() {
    return this.authService.isAdminUser();
  }

  get isUser() {
    return this.authService.isUser();
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  get username() {
    return this.authService.getUsername();
  }

}
