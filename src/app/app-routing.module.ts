import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './pages/homepage/homepage.component';
import { ProjectDetailComponent } from './project/project-detail.component';
import { UsComponent } from './us/us.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home', component: HomepageComponent,
    children: [
      { path: 'project/:id', component: ProjectDetailComponent },
      { path: 'nosotros', component: UsComponent }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
