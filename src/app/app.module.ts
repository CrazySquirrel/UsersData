import 'hammerjs';

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {MaterialModule} from '@angular/material';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {RoutingModule} from './routing.module';

/**
 * Services
 */
import {UserService} from './services/user.service';

/**
 * Components
 */
import {AppComponent} from './components/app/index';

import {UsersComponent} from './components/users';
import {UserComponent} from './components/user';

import {AlbumsComponent} from './components/albums';
import {AlbumComponent} from './components/album';

import {PhotosComponent} from './components/photos';
import {PhotoComponent} from './components/photo';

import {SearchComponent} from './components/search';

/**
 * Views
 */
import {Page404} from './views/page-404';

@NgModule({
  declarations: [
    AppComponent,

    UsersComponent,
    UserComponent,

    AlbumsComponent,
    AlbumComponent,

    PhotosComponent,
    PhotoComponent,

    SearchComponent,

    Page404
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,

    BrowserAnimationsModule,
    MaterialModule,

    RoutingModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
