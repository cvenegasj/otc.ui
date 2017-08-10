import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAppMaterialModule } from '../../my-app-material.module';

import { NetworkComponent } from './network.component';

@NgModule({
  declarations: [ NetworkComponent ],
  imports: [
    CommonModule,
    MyAppMaterialModule
  ],
  exports: [ NetworkComponent ],
  providers: [],
  entryComponents: []
})
export class NetworkModule { }
