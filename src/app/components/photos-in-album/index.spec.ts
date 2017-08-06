import {
    TestBed,
    async,
    ComponentFixture
} from '@angular/core/testing';
import {DebugElement} from '@angular/core';

import BaseTestingConfiguration from '../../spec/init';

import {Photo} from '../../models/photo';

import {PhotosInAlbumComponent} from '../../components/photos-in-album/index';

describe('PhotosInAlbumComponent', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

  let comp: PhotosInAlbumComponent;
  let fixture: ComponentFixture<PhotosInAlbumComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule(BaseTestingConfiguration).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosInAlbumComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  it(`should have init properties`, () => {
    expect(comp.preloader).toBeTrue();

    expect(comp.photos).toBeUndefined();
  });

  it(`should have main properties`, (done) => {
    comp.albumID = 1;
    comp.ngOnInit().then(() => {
      expect(comp.preloader).toBeFalse();

      expect(comp.photos).toBeArrayOfObjects();
      expect(comp.photos[0] instanceof Photo).toBeTrue();

      done();
    }).catch(done);
  });

  it(`should render properly`, (done) => {
    comp.ngOnInit().then(() => {
      const photosCount = comp.photos.length;

      expect(el.querySelectorAll('[data-unit-test="photos-in-album"] img').length).toEqual(photosCount);

      Array.from(el.querySelectorAll('[data-unit-test="photos-in-album"] img')).forEach((photoItem, photoIndex) => {
        expect(photoItem.getAttribute("src")).toEqual(comp.photos[photoIndex].thumbnailUrl);
      });

      done();
    }).catch(done);
  });
});
