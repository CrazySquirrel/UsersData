import {Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

import {Component} from '@angular/core';

import {Photo} from '../../models/photo';
import {PhotoService} from '../../services/photo.service';

import {Search} from '../../additional/search';

import {MdDialog} from '@angular/material';
import {PhotoPreviewDialog} from '../photo-preview';

@Component({
  selector: 'photos',
  templateUrl: './index.html',
  styleUrls: ['./index.scss']
})

export class PhotosComponent implements OnInit {
  /**
   * Input params
   */
  @Input() parentSearch = '';
  @Input() albumID;
  @Input() isParentSearch = false;

  /**
   * Photos
   */
  public allPhotos: Photo[];
  public filtredPhotos: Photo[];

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
   * Photos constructor
   * @param photoService
   * @param router
   * @param location
   * @param dialog
   */
  public constructor(public photoService: PhotoService,
                     public router: Router,
                     public location: Location,
                     public dialog: MdDialog) {
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
    this.getPhotos();
  }

  /****************************************************
   ********************* UI events ********************
   ****************************************************/

  /**
   * Open dialog
   */
  openDialog(photo) {
    this.dialog.open(PhotoPreviewDialog, {
      data: {
        photo
      }
    });
  }

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
   ********************* Data flow ********************
   ****************************************************/

  /**
   * Get all photos
   */
  private getPhotos(): Promise<Photo[]> {
    this.preloader = true;
    return this.photoService.getPhotoes()
    .then(photos => {
      photos = photos.filter((photo) => !this.albumID || photo.albumId === this.albumID);
      this.allPhotos = photos;
      this.filter();
      this.preloader = false;
      return photos;
    }).catch(() => {
      this.preloader = false;
    });
  }

  /**
   * Filter photos
   */
  private filter() {
    this.preloader = true;

    /**
     * Initial assignment
     */
    this.filtredPhotos = this.allPhotos;

    /**
     * Filter photo by parent search phrase
     */
    this.filtredPhotos = this.filtredPhotos.filter(photo => Search.search(photo, this.parentSearch, photo));

    /**
     * Filter photo by search phrase
     */
    this.filtredPhotos = this.filtredPhotos.filter(photo => Search.search(photo, this.search, photo));

    /**
     * Get pagination length
     */
    this.pageEvent.length = this.filtredPhotos.length;

    /**
     * Filter photo by pagination
     */
    this.filtredPhotos = this.filtredPhotos.filter((v, i) => (
        i >= this.pageEvent.pageIndex * this.pageEvent.pageSize &&
        i < (this.pageEvent.pageIndex + 1) * this.pageEvent.pageSize
    ));

    this.preloader = false;
  }
}
