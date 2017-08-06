import {TestBed, getTestBed, inject} from '@angular/core/testing';

import {HttpModule} from '@angular/http';

import {Album} from '../../models/album';

import {AlbumService} from './index';

describe('AlbumService', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

  let injector;
  let service: AlbumService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [AlbumService]
    });

    injector = getTestBed();
  });

  beforeEach(() => {
    service = injector.get(AlbumService);
  });


  it('getAlbums', (done) => {
    service.getAlbums().then(data => {
      expect(data).toBeArrayOfObjects();
      expect(data[0] instanceof Album).toBeTrue();
      done();
    }).catch(done);
  });

  it('getAlbum', (done) => {
    service.getAlbum(1).then(data => {
      expect(data).toBeObject();
      expect(data instanceof Album).toBeTrue();
      done();
    }).catch(done);
  });
});
