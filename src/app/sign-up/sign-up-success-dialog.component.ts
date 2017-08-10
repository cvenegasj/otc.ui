import { MdDialogRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
  template: `
    <div style="width: 300px;">
      <h1 md-dialog-title>¡Registro correcto!</h1>
      <p>Ingresa con tus credenciales para empezar a datear y crear proyectos.</p>
      <md-dialog-actions fxLayout="column" fxFlexAlign="center center">
        <button md-button type="button" color="accent" md-dialog-close>OK</button>
      </md-dialog-actions>
    </div>`
})
export class SignUpSuccessDialogComponent {

  constructor(public dialogRef: MdDialogRef<SignUpSuccessDialogComponent>) { }

}
