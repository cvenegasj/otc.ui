import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  templateUrl: './add-dateo.component.html'
})
export class AddDateoComponent {

  constructor(
    public dialogRef: MdDialogRef<AddDateoComponent>
  ) { }

}
