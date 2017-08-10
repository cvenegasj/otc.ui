import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { MdDialog, MdDialogRef} from '@angular/material';
import { SignUpComponent } from '../sign-up/signup.component';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loading = false;
  error = '';
  redirectUrl: string;

  constructor(
              public dialogRef: MdDialogRef<LoginComponent>,
              public dialog: MdDialog,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService
  ) {
    this.redirectUrl = this.activatedRoute.snapshot.queryParams['redirectTo'];
  }

  ngOnInit(): void {
    this.authService.logout();
  }

  login(data) {
    this.loading = true;
    console.log(data);

    this.authService.login(data.email, data.password)
      .subscribe(result => {
          this.loading = false;

          if (result) {
            this.authService.doAfterLogin(result);
            this.doAfterSuccess();
          } else {
            this.error = 'El email o contraseña es incorrecto.';
          }
        }, error => {
          this.error = 'El email o contraseña es incorrecto.';
          this.loading = false;
        }
      );
  }

  private doAfterSuccess() {
    console.log('Logged in!');
    this.dialogRef.close();

    if (this.redirectUrl) {
      this.router.navigateByUrl(this.redirectUrl);
    } else {
      this.router.navigate(['/']);
    }
  }

  openSignUpDialog() {
    this.dialogRef.close();
    this.dialog.open(SignUpComponent);
  }

}
