import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Album} from '../models/album';

@Injectable()
export class AlbumService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private albumsUrl = '//jsonplaceholder.typicode.com/albums';

  constructor(private http: Http) {
  }

  getAlbumes(): Promise<Album[]> {
    return this.http.get(this.albumsUrl)
    .toPromise()
    .then(response => response.json() as Album[])
    .catch(this.handleError);
  }


  getAlbum(id: number): Promise<Album> {
    const url = `${this.albumsUrl}/${id}`;
    return this.http.get(url)
    .toPromise()
    .then(response => response.json() as Album)
    .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.albumsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
    .toPromise()
    .then(() => null)
    .catch(this.handleError);
  }

  create(album: Album): Promise<Album> {
    return this.http
    .post(this.albumsUrl, JSON.stringify(album), {headers: this.headers})
    .toPromise()
    .then(res => res.json() as Album)
    .catch(this.handleError);
  }

  update(album: Album): Promise<Album> {
    const url = `${this.albumsUrl}/${album.id}`;
    return this.http
    .put(url, JSON.stringify(album), {headers: this.headers})
    .toPromise()
    .then(() => album)
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
