import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  templateUrl: './add-project.component.html'
})
export class AddProjectComponent {

  isOccupied = false;
  isToBeOccupied = false;
  isInConflict = false;

  constructor(public dialogRef: MdDialogRef<AddProjectComponent>) { }

}
