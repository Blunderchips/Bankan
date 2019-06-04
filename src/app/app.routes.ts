import { Routes } from '@angular/router';

import { AuthGuard } from './services/auth.guard';

import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const ROUTES: Routes = [
    { path: '', redirectTo: '/signin', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'signin', component: SigninComponent },
    { path: '**', component: PageNotFoundComponent }
];
