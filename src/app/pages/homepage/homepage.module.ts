import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAppMaterialModule } from '../../my-app-material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';
import { ProjectModule } from '../../project/project.module';

import { HomepageComponent } from './homepage.component';
import { ProjectDetailComponent } from '../../project/project-detail.component';
import { UsModule } from '../../us/us.module';

@NgModule({
  declarations: [ HomepageComponent ],
  imports: [
    CommonModule,
    MyAppMaterialModule,
    FormsModule,
    ReactiveFormsModule,

    AgmCoreModule.forRoot({
      libraries: ['places'],
      apiKey: 'AIzaSyAzyrmYDcVplIELoYdVUIsM7Idbg74kYXI'
    }),
    ProjectModule,
    UsModule,
    RouterModule
  ],
  exports: [ HomepageComponent ],
  providers: [],
  entryComponents: []
})
export class HomepageModule { }
