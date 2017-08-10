import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { AuthConfig, AuthHttp } from 'angular2-jwt';

import { MyAppMaterialModule } from './my-app-material.module';

/* Routing Module */
import { AppRoutingModule } from './app-routing.module';

/* Components */
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/signup.component';
import { SignUpSuccessDialogComponent } from './sign-up/sign-up-success-dialog.component';

/* Feature Modules */
import { NavBarModule } from './navbar/navbar.module';
import { HomepageModule } from './pages/homepage/homepage.module';

/* Services */
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth-guard.service';
import { AdminAuthGuard } from './guards/admin-auth-guard.service';
import { TOKEN_NAME } from './services/app.constants';
import { DateoService } from './services/dateo.service';
import { ProjectService } from './services/project.service';

import { SidenavService } from './services/sidenav.service';
import { HomepageSharedService } from './pages/homepage/homepage-shared.service';
import { NetworkModule } from './pages/network/network.module';
import { ImprovementsModule } from './pages/improvements/improvements.module';

export function authHttpServiceFactory(http: Http) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: 'Bearer',
    tokenName: TOKEN_NAME,
    globalHeaders: [{'Content-Type': 'application/json'}],
    noJwtError: false,
    noTokenScheme: true,
    tokenGetter: (() => localStorage.getItem(TOKEN_NAME))
  }), http);
}

@NgModule({
  imports: [
    BrowserModule,
    MyAppMaterialModule,
    FormsModule,
    HttpModule,

    NavBarModule,
    HomepageModule,
    NetworkModule,
    ImprovementsModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    SignUpSuccessDialogComponent
  ],
  providers: [
    { provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [ Http ] },
    AuthService,
    UserService,
    AuthGuard,
    AdminAuthGuard,
    HomepageSharedService,
    SidenavService,
    DateoService,
    ProjectService
  ],
  entryComponents: [ LoginComponent, SignUpComponent, SignUpSuccessDialogComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
