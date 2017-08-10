import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAppMaterialModule } from '../my-app-material.module';
import { RouterModule } from '@angular/router';

import { SidenavService } from '../services/sidenav.service';
import { NavBarComponent } from './navbar.component';

@NgModule({
  imports: [ MyAppMaterialModule, RouterModule, CommonModule ],
  declarations: [ NavBarComponent ],
  exports: [ NavBarComponent ],
  providers: [ SidenavService ]
})
export class NavBarModule { }
