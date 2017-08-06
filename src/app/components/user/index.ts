import {OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

import {Component} from '@angular/core';

import {User} from '../../models/user';
import {UserService} from '../../services/user/index';

@Component({
  selector: 'user',
  templateUrl: './index.html',
  styleUrls: ['./index.scss']
})

export class UserComponent implements OnInit {

  /**
   * User
   */
  user: User;

  /**
   * Preloader
   */
  public preloader = true;

  /**
   * Is online
   */
  public onLine: boolean;

  /**
   * User constructor
   * @param userService
   * @param router
   * @param route
   * @param location
   */
  public constructor(public userService: UserService,
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
  public ngOnInit(): Promise<User> {
    return new Promise((resolve, reject) => {
      this.route.params.subscribe(params => {
        this.getUser(+params['id']).then(resolve).catch((e) => {
          reject(e);
          this.goToUsersList.bind(this);
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
   * Go to add new user page
   */
  public goToUsersList() {
    this.router.navigate(['/users/']);
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
   * Get user
   */
  public getUser(userID: number): Promise<User> {
    this.preloader = true;

    return this.userService
    .getUser(userID)
    .then(user => {
      this.user = user;

      this.preloader = false;

      return user;
    }).catch(() => {
      this.preloader = true;
    });
  }
}
