import {OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

import {Component} from '@angular/core';

import {User} from '../../models/user';
import {UserService} from '../../services/user.service';

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
  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getUser(+params['id']).catch(this.goToUsersList.bind(this));
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
      this.preloader = false;
    });
  }
}
