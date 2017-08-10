import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { SignUpSuccessDialogComponent } from './sign-up-success-dialog.component';

@Component({
  templateUrl: './signup.component.html'
})
export class SignUpComponent {

  loading = false;
  error = '';

  constructor(
    public dialogRef: MdDialogRef<SignUpComponent>,
    public dialog: MdDialog,
    private userService: UserService
  ) { }

  signUp(data) {
    this.loading = true;
    console.log(data);

    const newUser = new User();
    newUser.firstName = data.firstName;
    newUser.lastName = data.lastName;
    newUser.email = data.email;
    newUser.password = data.password;
    newUser.organization = data.organization;

    this.userService.createUser(newUser)
      .then(createdUser => {
        this.loading = false;
        console.log('saved!');
        console.log(createdUser);
        this.dialogRef.close();
        this.dialog.open(SignUpSuccessDialogComponent);
      }, error => {
        this.error = 'Ocurrió un error. Intenta nuevamente.';
        this.loading = false;
      });
  }

}
