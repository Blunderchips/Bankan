import { Routes } from '@angular/router';

import { AuthGuard } from './services/auth.guard';

import { UserComponent } from 'ngx-auth-firebaseui';

import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';

export const ROUTES: Routes = [
    { path: '', redirectTo: '/signin', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'signin', component: SigninComponent },
    { path: 'user', component: UserComponent, canActivate: [AuthGuard] }, // ngx-auth-firebaseui-user
    // { path: '**', component: PageNotFoundComponent }
];
