import { NgModule } from '@angular/core';
import { MyAppMaterialModule } from '../my-app-material.module';
import { RouterModule } from '@angular/router';

import { SidenavService } from '../shared/sidenav.service';
import { NavBarComponent } from './navbar.component';

@NgModule({
  imports: [ MyAppMaterialModule, RouterModule ],
  declarations: [ NavBarComponent ],
  exports: [ NavBarComponent ],
  providers: [ SidenavService ]
})
export class NavBarModule { }
