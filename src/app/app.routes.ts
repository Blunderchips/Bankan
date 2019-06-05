import { Routes } from '@angular/router';

import { AuthGuard } from './services/auth.guard';

import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';

export const ROUTES: Routes = [
    { path: '', redirectTo: '/signin', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'signin', component: SigninComponent },
    // { path: '**', component: PageNotFoundComponent }
];
