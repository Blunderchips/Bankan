import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http'; // needed by Avatar Module 

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment.prod';

import { AvatarModule } from 'ngx-avatar';

import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { ListComponent } from './elements/list/list.component';
import { ItemComponent } from './elements/item/item.component';
import { BookComponent } from './elements/book/book.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    ListComponent,
    ItemComponent,
    BookComponent,
    NavComponent,
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
    NgxAuthFirebaseUIModule.forRoot(environment.firebase),
    HttpClientModule,
    AvatarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
