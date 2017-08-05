import {Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

import {Component} from '@angular/core';

import {User} from '../../models/user';
import {UserService} from '../../services/user.service';

import {Search} from '../../additional/search';

@Component({
  selector: 'users',
  templateUrl: './index.html',
  styleUrls: ['./index.scss']
})

export class UsersComponent implements OnInit {
  /**
   * Input params
   */
  @Input() parentSearch = '';

  /**
   * Users
   */
  public allUsers: User[];
  public filtredUsers: User[];

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
   * Users constructor
   * @param userService
   * @param router
   * @param location
   */
  public constructor(public userService: UserService,
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
    this.getUsers();
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
   * @param user
   */
  public goToDetail(user: User): void {
    this.router.navigate(['/user', user.id]);
  }

  /****************************************************
   ********************* Data flow ********************
   ****************************************************/

  /**
   * Get all users
   */
  private getUsers(): Promise<User[]> {
    this.preloader = true;
    return this.userService.getUseres()
    .then(users => {
      this.allUsers = users;
      this.filter();
      this.preloader = false;
      return users;
    }).catch(() => {
      this.preloader = false;
    });
  }

  /**
   * Filter users
   */
  private filter() {
    this.preloader = true;

    /**
     * Initial assignment
     */
    this.filtredUsers = this.allUsers;

    /**
     * Filter user by parent search phrase
     */
    this.filtredUsers = this.filtredUsers.filter(user => Search.search(user, this.parentSearch, user));

    /**
     * Filter user by search phrase
     */
    this.filtredUsers = this.filtredUsers.filter(user => Search.search(user, this.search, user));

    /**
     * Get pagination length
     */
    this.pageEvent.length = this.filtredUsers.length;

    /**
     * Filter user by pagination
     */
    this.filtredUsers = this.filtredUsers.filter((v, i) => (
        i >= this.pageEvent.pageIndex * this.pageEvent.pageSize &&
        i < (this.pageEvent.pageIndex + 1) * this.pageEvent.pageSize
    ));

    this.preloader = false;
  }
}
