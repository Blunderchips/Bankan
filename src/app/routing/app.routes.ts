import { Routes } from '@angular/router';

import { UserComponent, LoggedInGuard } from 'ngx-auth-firebaseui';

import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { BookComponent } from '../book/book/book.component';
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
