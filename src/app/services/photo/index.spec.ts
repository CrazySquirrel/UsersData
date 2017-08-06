import {TestBed, getTestBed, inject} from '@angular/core/testing';

import {HttpModule} from '@angular/http';

import {Photo} from '../../models/photo';

import {PhotoService} from './index';

describe('PhotoService', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

  let injector;
  let service: PhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [PhotoService]
    });

    injector = getTestBed();
  });

  beforeEach(() => {
    service = injector.get(PhotoService);
  });


  it('getPhotos', (done) => {
    service.getPhotos().then(data => {
      expect(data).toBeArrayOfObjects();
      expect(data[0] instanceof Photo).toBeTrue();
      done();
    }).catch(done);
  });
});
