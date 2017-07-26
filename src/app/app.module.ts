import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MyAppMaterialModule } from './my-app-material.module';

/* App Root */
import { AppComponent } from './app.component';

/* Feature Modules */
import { NavBarModule } from './navbar/navbar.module';
import { HomepageModule } from './pages/homepage/homepage.module';

/* Routing Module */
import { AppRoutingModule } from './app-routing.module';

/* Services */
import { SidenavService } from './shared/sidenav.service';
import {UserService} from './shared/user.service';
import {ProjectService} from './shared/project.service';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

@NgModule({
  imports: [
    BrowserModule,
    MyAppMaterialModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),

    NavBarModule,
    HomepageModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [ SidenavService, UserService, ProjectService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
