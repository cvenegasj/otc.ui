import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAppMaterialModule } from '../my-app-material.module';

import { ProjectComponent } from './project.component';

@NgModule({
  declarations: [ ProjectComponent ],
  imports: [
    CommonModule,
    MyAppMaterialModule
  ],
  exports: [ ProjectComponent ],
  providers: [],
  entryComponents: []
})
export class ProjectModule { }
