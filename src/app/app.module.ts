import 'hammerjs';

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {MaterialModule, MdIconRegistry} from '@angular/material';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {RoutingModule} from './routing.module';

/**
 * Pipes
 */
import {PhoneHrefPipe} from './pipes/phoneHref';
import {GeoHrefPipe} from './pipes/geoHref';

/**
 * Services
 */
import {UserService} from './services/user.service';
import {AlbumService} from './services/album.service';
import {PhotoService} from './services/photo.service';

/**
 * Components
 */
import {AppComponent} from './components/app/index';

import {UsersComponent} from './components/users';
import {UserComponent} from './components/user';

import {AlbumsComponent} from './components/albums';
import {AlbumComponent} from './components/album';

import {PhotosComponent} from './components/photos';
import {PhotoPreviewDialog} from './components/photo-preview';
import {PhotosInAlbumComponent} from './components/photos-in-album';

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
    PhotoPreviewDialog,
    PhotosInAlbumComponent,

    SearchComponent,

    Page404,

    PhoneHrefPipe,
    GeoHrefPipe
  ],
  entryComponents: [
    PhotoPreviewDialog
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
    UserService,
    AlbumService,
    PhotoService,
    MdIconRegistry
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
