import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAppMaterialModule } from '../my-app-material.module';

import {DateoComponent} from './dateo.component';

@NgModule({
  declarations: [ DateoComponent ],
  imports: [
    CommonModule,
    MyAppMaterialModule
  ],
  exports: [ DateoComponent ],
  providers: [],
  entryComponents: []
})
export class DateoModule { }
