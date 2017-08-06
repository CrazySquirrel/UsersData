import {
    TestBed,
    async,
    ComponentFixture
} from '@angular/core/testing';
import {DebugElement} from '@angular/core';

import BaseTestingConfiguration from '../../spec/init';

import {Photo} from '../../models/photo';

import {PhotosComponent} from '../../components/photos/index';

describe('PhotosComponent', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

  let comp: PhotosComponent;
  let fixture: ComponentFixture<PhotosComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule(BaseTestingConfiguration).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  it(`should have init properties`, () => {
    expect(comp.preloader).toBeTrue();

    expect(comp.allPhotos).toBeUndefined();
    expect(comp.filtredPhotos).toBeUndefined();

    expect(comp.pageEvent).toEqual({
      pageIndex: 0,
      pageSize: 6
    });
    expect(comp.pageSize).toEqual(6);
    expect(comp.pageSizeOptions).toEqual([6, 12, 24, 48, 96]);
  });

  it(`should have main properties`, (done) => {
    comp.ngOnInit().then(() => {
      expect(comp.preloader).toBeFalse();

      expect(comp.allPhotos).toBeArrayOfObjects();
      expect(comp.allPhotos[0] instanceof Photo).toBeTrue();

      expect(comp.filtredPhotos).toBeArrayOfObjects();
      expect(comp.filtredPhotos[0] instanceof Photo).toBeTrue();

      expect(comp.pageEvent).toEqual({
        pageIndex: 0,
        pageSize: 6,
        length: comp.allPhotos.length
      });
      expect(comp.pageSize).toEqual(6);
      expect(comp.pageSizeOptions).toEqual([6, 12, 24, 48, 96]);

      done();
    }).catch(done);
  });

  it(`should render properly`, (done) => {
    comp.ngOnInit().then(() => {
      const photosCount = comp.filtredPhotos.length;
      const photosOnPageCount = Math.min(photosCount, 6);

      expect(el.querySelector('[data-unit-test="photos-search-input"]').nodeName.toLowerCase()).toContain('input');
      expect(el.querySelector('[data-unit-test="photos-search-input"]').getAttribute("placeholder")).toContain('Search');

      expect(el.querySelectorAll('[data-unit-test="photos"] [data-unit-test="photos-items"]').length).toEqual(photosOnPageCount);

      Array.from(el.querySelectorAll('[data-unit-test="photos"] [data-unit-test="photos-items"]')).forEach((photoItem, photoIndex) => {
        expect(photoItem.querySelector('[data-unit-test="photos-item-pictures"]').getAttribute("src")).toEqual(comp.filtredPhotos[photoIndex].thumbnailUrl);
        expect(photoItem.querySelector('[data-unit-test="photos-item-title"]').textContent).toContain(comp.filtredPhotos[photoIndex].title);
      });

      expect(el.querySelector('[data-unit-test="photos-pagination"] .mat-paginator-page-size-label').textContent).toContain('Items per page:');
      expect(el.querySelector('[data-unit-test="photos-pagination"] .mat-paginator-range-label').textContent).toContain('1 - ' + photosOnPageCount + ' of ' + photosCount);

      done();
    }).catch(done);
  });
});
