import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoggedInGuard, UserComponent } from 'ngx-auth-firebaseui';

import { HomeComponent } from './home/home.component';
import { BookComponent } from '../book/book/book.component';
import { SigninComponent } from './signin/signin.component';
import { Error404Component } from './error-404/error-404.component';

export const ROUTES: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent, canActivate: [LoggedInGuard],
    children: [
      { path: ':bookUid', component: BookComponent }
    ]
  },
  { path: 'signin', component: SigninComponent },
  { path: 'user', component: UserComponent, canActivate: [LoggedInGuard] }, // ngx-auth-firebaseui-user
  { path: '**', component: Error404Component },

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(ROUTES, {
      useHash: true // For child routes, error 404 without
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
