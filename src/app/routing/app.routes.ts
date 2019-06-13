import { Routes } from '@angular/router';

import { UserComponent, LoggedInGuard } from 'ngx-auth-firebaseui';

import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';

export const ROUTES: Routes = [
    { path: '', redirectTo: '/signin', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [LoggedInGuard] },
    { path: 'signin', component: SigninComponent },
    { path: 'user', component: UserComponent, canActivate: [LoggedInGuard] }, // ngx-auth-firebaseui-user
    // { path: '**', component: PageNotFoundComponent }
];
