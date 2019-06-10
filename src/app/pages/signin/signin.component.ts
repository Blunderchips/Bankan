import { Component, OnInit } from '@angular/core';

import { AuthProvider, Theme } from 'ngx-auth-firebaseui';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  providers = AuthProvider;
  themes = Theme;

  constructor() { }

  ngOnInit() {
  }

  printUser(event: any) {
    console.log(event);
  }

  printError(event: any) {
    console.error(event);
  }
}
