import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdButtonModule, MdSidenavModule, MdCardModule, MdListModule,
  MdInputModule, MdAutocompleteModule, MdDialogModule, MdCheckboxModule, MdDatepickerModule, MdNativeDateModule, MdMenuModule } from '@angular/material';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FlexLayoutModule,
    MdButtonModule,
    MdSidenavModule,
    MdCardModule,
    MdListModule,
    MdInputModule,
    MdAutocompleteModule,
    MdDialogModule,
    MdCheckboxModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdMenuModule
  ],
  exports: [
    BrowserAnimationsModule,
    FlexLayoutModule,
    MdButtonModule,
    MdSidenavModule,
    MdCardModule,
    MdListModule,
    MdInputModule,
    MdAutocompleteModule,
    MdDialogModule,
    MdCheckboxModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdMenuModule
  ],
})
export class MyAppMaterialModule { }
