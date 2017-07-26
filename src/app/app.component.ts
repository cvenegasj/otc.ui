import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {

  users = [
    {
      name: 'Lia Lugo',
      avatar: 'svg-11',
      details: 'I love cheese, ...',
      isAdmin: true,
      isCool: false
    },
    {
      name: 'George Duke',
      avatar: 'svg-12',
      details: 'Zombie ipsum ...',
      isAdmin: false,
      isCool: true
    },
    {
      name: 'Adam Jones',
      avatar: 'svg-13',
      details: 'Awesome guitar player ...',
      isAdmin: false,
      isCool: true
    }
    // ...
  ];

  selectedUser = this.users[0];
}
