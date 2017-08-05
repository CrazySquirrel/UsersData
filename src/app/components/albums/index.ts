import {Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

import {Component} from '@angular/core';

import {Album} from '../../models/album';
import {AlbumService} from '../../services/album.service';

import {Search} from '../../additional/search';

@Component({
  selector: 'albums',
  templateUrl: './index.html',
  styleUrls: ['./index.scss']
})

export class AlbumsComponent implements OnInit {
  /**
   * Input params
   */
  @Input() parentSearch = '';
  @Input() userID;
  @Input() isParentSearch = false;

  /**
   * Albums
   */
  public allAlbums: Album[];
  public filtredAlbums: Album[];

  /**
   * Search phrase
   */
  public search = '';

  /**
   * Pagination size and pagination size options
   */
  public pageSize = 6;
  public pageSizeOptions: number[] = [6, 12, 24, 48, 96];

  /**
   * Pagination object
   */
  public pageEvent: any;

  /**
   * Preloader
   */
  public preloader = true;

  /**
   * Is online
   */
  public onLine: boolean;

  /**
   * Albums constructor
   * @param albumService
   * @param router
   * @param location
   */
  public constructor(public albumService: AlbumService,
                     public router: Router,
                     public location: Location) {
    this.onLine = navigator.onLine;


    this.pageEvent = {
      pageIndex: 0,
      pageSize: this.pageSize
    };
  }

  /****************************************************
   ***************** Live circle events ***************
   ****************************************************/

  /**
   * Init event
   */
  public ngOnInit(): void {
    this.getAlbums();
  }

  /****************************************************
   ********************* UI events ********************
   ****************************************************/

  /**
   * Pagination
   * @param $event
   */
  public doPagination($event) {
    this.pageEvent = $event;
    this.filter();
  }

  /**
   * Search
   */
  public doSearch() {
    this.filter();
  }

  /****************************************************
   **************** Navigation actions ****************
   ****************************************************/

  /**
   * Got to detail page
   * @param album
   */
  public goToDetail(album: Album): void {
    this.router.navigate(['/album', album.id]);
  }

  /****************************************************
   ********************* Data flow ********************
   ****************************************************/

  /**
   * Get all albums
   */
  private getAlbums(): Promise<Album[]> {
    this.preloader = true;
    return this.albumService.getAlbumes()
    .then(albums => {
      albums = albums.filter((album) => !this.userID || album.userId === this.userID);
      this.allAlbums = albums;
      this.filter();
      this.preloader = false;
      return albums;
    }).catch(() => {
      this.preloader = false;
    });
  }

  /**
   * Filter albums
   */
  private filter() {
    this.preloader = true;

    /**
     * Initial assignment
     */
    this.filtredAlbums = this.allAlbums;

    /**
     * Filter album by parent search phrase
     */
    this.filtredAlbums = this.filtredAlbums.filter(album => Search.search(album, this.parentSearch, album));

    /**
     * Filter album by search phrase
     */
    this.filtredAlbums = this.filtredAlbums.filter(album => Search.search(album, this.search, album));

    /**
     * Get pagination length
     */
    this.pageEvent.length = this.filtredAlbums.length;

    /**
     * Filter album by pagination
     */
    this.filtredAlbums = this.filtredAlbums.filter((v, i) => (
        i >= this.pageEvent.pageIndex * this.pageEvent.pageSize &&
        i < (this.pageEvent.pageIndex + 1) * this.pageEvent.pageSize
    ));

    this.preloader = false;
  }
}
