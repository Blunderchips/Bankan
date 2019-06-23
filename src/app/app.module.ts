import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http'; // needed by Avatar Module 
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { CookieService } from 'ngx-cookie-service';
import { AvatarModule } from 'ngx-avatar';

import { environment } from 'src/environments/environment.prod';
import { AppRoutingModule } from './routing/app-routing.module';
import { BookModule } from './book/book.module';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './routing/home/home.component';
import { SigninComponent } from './routing/signin/signin.component';
import { Error404Component } from './routing/error-404/error-404.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    NavComponent,
    Error404Component,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    LayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFirestoreModule.enablePersistence(), // enable offline caching
    NgxAuthFirebaseUIModule.forRoot(environment.firebase),
    HttpClientModule,
    AvatarModule,
    BookModule,
    FormsModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
