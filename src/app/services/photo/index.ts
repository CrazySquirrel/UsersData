import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Photo} from '../../models/photo';

@Injectable()
export class PhotoService {

  private photosUrl = location.protocol + '//jsonplaceholder.typicode.com/photos';

  constructor(private http: Http) {
  }

  getPhotos(): Promise<Photo[]> {
    return this.http.get(this.photosUrl)
    .toPromise()
    .then(response => response.json().map((v) => new Photo(v)))
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
