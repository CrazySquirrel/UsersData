import {OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

import {Component} from '@angular/core';

import {Album} from '../../models/album';
import {AlbumService} from '../../services/album/index';

@Component({
  selector: 'album',
  templateUrl: './index.html',
  styleUrls: ['./index.scss']
})

export class AlbumComponent implements OnInit {

  /**
   * Album
   */
  album: Album;

  /**
   * Preloader
   */
  public preloader = true;

  /**
   * Is online
   */
  public onLine: boolean;

  /**
   * Album constructor
   * @param albumService
   * @param router
   * @param route
   * @param location
   */
  public constructor(public albumService: AlbumService,
                     public router: Router,
                     public route: ActivatedRoute,
                     public location: Location) {
    this.onLine = navigator.onLine;
  }

  /****************************************************
   ***************** Live circle events ***************
   ****************************************************/

  /**
   * Init event
   */
  public ngOnInit(): Promise<Album> {
    return new Promise((resolve, reject) => {
      this.route.params.subscribe(params => {
        this.getAlbum(+params['id']).then(resolve).catch((e) => {
          reject(e);
          this.goToAlbumsList.bind(this);
        });
      });
    });
  }

  /****************************************************
   ********************* UI events ********************
   ****************************************************/

  /****************************************************
   **************** Navigation actions ****************
   ****************************************************/

  /**
   * Go to add new album page
   */
  public goToAlbumsList() {
    this.router.navigate(['/albums/']);
  }

  /**
   * Go back
   */
  public goBack(): void {
    this.location.back();
  }

  /****************************************************
   ********************* Data flow ********************
   ****************************************************/

  /**
   * Get album
   */
  public getAlbum(albumID: number): Promise<Album> {
    this.preloader = true;

    return this.albumService
    .getAlbum(albumID)
    .then(album => {
      this.album = album;

      this.preloader = false;

      return album;
    }).catch(() => {
      this.preloader = true;
    });
  }
}
