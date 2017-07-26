import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAppMaterialModule } from '../my-app-material.module';

import { ProjectDetailComponent } from './project-detail.component';

@NgModule({
  declarations: [ ProjectDetailComponent ],
  imports: [
    CommonModule,
    MyAppMaterialModule
  ],
  exports: [ ProjectDetailComponent ],
  providers: [],
  entryComponents: []
})
export class ProjectModule { }
