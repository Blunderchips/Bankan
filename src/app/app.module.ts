import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment.prod';

import { HomeComponent } from './pages/home/home.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ItemTreeComponent } from './list-tree/list-tree.component';
import { SigninComponent } from './pages/signin/signin.component';
import { ListComponent } from './elements/list/list.component';
import { ItemComponent } from './elements/item/item.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ItemTreeComponent,
    SigninComponent,
    ListComponent,
    ItemComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
