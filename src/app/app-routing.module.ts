import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth-guard.service';
import { AdminAuthGuard } from './guards/admin-auth-guard.service';

import { HomepageComponent } from './pages/homepage/homepage.component';
import { DateoComponent } from './dateo/dateo.component';
import { ProjectComponent } from './project/project.component';
import { UsComponent } from './pages/us/us.component';
import { NetworkComponent } from './pages/network/network.component';
import { ImprovementsComponent } from './pages/improvements/improvements.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home', component: HomepageComponent,
    children: [
      { path: 'dateos/:id', component: DateoComponent },
      { path: 'proyectos/:id', component: ProjectComponent },
      { path: 'nosotros', component: UsComponent }
      // { path: 'addDateo', component: UsComponent, canActivate: [AuthGuard] }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
