import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Photo} from '../models/photo';

@Injectable()
export class PhotoService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private photosUrl = '//jsonplaceholder.typicode.com/photos';

  constructor(private http: Http) {
  }

  getPhotoes(): Promise<Photo[]> {
    return this.http.get(this.photosUrl)
    .toPromise()
    .then(response => response.json() as Photo[])
    .catch(this.handleError);
  }


  getPhoto(id: number): Promise<Photo> {
    const url = `${this.photosUrl}/${id}`;
    return this.http.get(url)
    .toPromise()
    .then(response => response.json() as Photo)
    .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.photosUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
    .toPromise()
    .then(() => null)
    .catch(this.handleError);
  }

  create(photo: Photo): Promise<Photo> {
    return this.http
    .post(this.photosUrl, JSON.stringify(photo), {headers: this.headers})
    .toPromise()
    .then(res => res.json() as Photo)
    .catch(this.handleError);
  }

  update(photo: Photo): Promise<Photo> {
    const url = `${this.photosUrl}/${photo.id}`;
    return this.http
    .put(url, JSON.stringify(photo), {headers: this.headers})
    .toPromise()
    .then(() => photo)
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
