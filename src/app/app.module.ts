import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';

import { AF } from "../providers/af";
import {RouterModule, Routes} from "@angular/router";

// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyA3yd8G5uWLUZP8M3fwEty7A8a1lEjIc6E',
  authDomain: 'fir-crud-181c4.firebaseapp.com',
  databaseURL: 'https://fir-crud-181c4.firebaseio.com',
  projectId: "fir-crud-181c4",
  storageBucket: 'fir-crud-181c4.appspot.com',
  messagingSenderId: '48533387928'
};

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegistrationPageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    RegistrationPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(routes)
  ],
  providers: [AF,AngularFireAuth,AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
