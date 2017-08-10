import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAppMaterialModule } from '../../my-app-material.module';

import { ImprovementsComponent } from './improvements.component';

@NgModule({
  declarations: [ ImprovementsComponent ],
  imports: [
    CommonModule,
    MyAppMaterialModule
  ],
  exports: [ ImprovementsComponent ],
  providers: [],
  entryComponents: []
})
export class ImprovementsModule { }
