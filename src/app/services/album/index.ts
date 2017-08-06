import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Album} from '../../models/album';

@Injectable()
export class AlbumService {

  private albumsUrl = location.protocol + '//jsonplaceholder.typicode.com/albums';

  constructor(private http: Http) {
  }

  getAlbums(): Promise<Album[]> {
    return this.http.get(this.albumsUrl)
    .toPromise()
    .then(response => response.json().map((v) => new Album(v)))
    .catch(this.handleError);
  }


  getAlbum(id: number): Promise<Album> {
    const url = `${this.albumsUrl}/${id}`;
    return this.http.get(url)
    .toPromise()
    .then(response => new Album(response.json()))
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
