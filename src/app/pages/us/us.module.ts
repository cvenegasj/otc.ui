import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAppMaterialModule } from '../../my-app-material.module';

import { UsComponent } from './us.component';

@NgModule({
  declarations: [ UsComponent ],
  imports: [
    CommonModule,
    MyAppMaterialModule
  ],
  exports: [ UsComponent ],
  providers: [],
  entryComponents: []
})
export class UsModule { }
