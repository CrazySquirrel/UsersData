import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {User} from '../../models/user';

@Injectable()
export class UserService {

  private usersUrl = location.protocol + '//jsonplaceholder.typicode.com/users';

  constructor(private http: Http) {
  }

  getUsers(): Promise<User[]> {
    return this.http.get(this.usersUrl)
    .toPromise()
    .then(response => response.json().map((v) => new User(v)))
    .catch(this.handleError);
  }


  getUser(id: number): Promise<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get(url)
    .toPromise()
    .then(response => new User(response.json()))
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
