import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAppMaterialModule } from '../../my-app-material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';
import { ProjectModule } from '../../project/project.module';

import { HomepageComponent } from './homepage.component';
import { DateoModule } from '../../dateo/dateo.module';
import { AddDateoComponent } from '../../add-dateo/add-dateo.component';
import { AddProjectComponent } from '../../add-project/add-project.component';
import { UsModule } from '../us/us.module';
import { StringToNumberPipe } from '../../pipes/string-to-number.pipe';

@NgModule({
  declarations: [
    StringToNumberPipe,
    HomepageComponent,
    AddDateoComponent,
    AddProjectComponent
  ],
  imports: [
    CommonModule,
    MyAppMaterialModule,
    FormsModule,
    ReactiveFormsModule,

    AgmCoreModule.forRoot({
      libraries: ['places'],
      apiKey: 'AIzaSyAzyrmYDcVplIELoYdVUIsM7Idbg74kYXI'
    }),

    DateoModule,
    ProjectModule,
    UsModule,
    RouterModule
  ],
  exports: [ HomepageComponent ],
  providers: [ ],
  entryComponents: [ AddDateoComponent, AddProjectComponent ]
})
export class HomepageModule { }
