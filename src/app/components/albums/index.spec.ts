import {
    TestBed,
    async,
    ComponentFixture
} from '@angular/core/testing';
import {DebugElement} from '@angular/core';

import BaseTestingConfiguration from '../../spec/init';

import {Album} from '../../models/album';

import {AlbumsComponent} from '../../components/albums/index';

describe('AlbumsComponent', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

  let comp: AlbumsComponent;
  let fixture: ComponentFixture<AlbumsComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule(BaseTestingConfiguration).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumsComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  it(`should have init properties`, () => {
    expect(comp.preloader).toBeTrue();

    expect(comp.allAlbums).toBeUndefined();
    expect(comp.filtredAlbums).toBeUndefined();

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

      expect(comp.allAlbums).toBeArrayOfObjects();
      expect(comp.allAlbums[0] instanceof Album).toBeTrue();

      expect(comp.filtredAlbums).toBeArrayOfObjects();
      expect(comp.filtredAlbums[0] instanceof Album).toBeTrue();

      expect(comp.pageEvent).toEqual({
        pageIndex: 0,
        pageSize: 6,
        length: comp.allAlbums.length
      });
      expect(comp.pageSize).toEqual(6);
      expect(comp.pageSizeOptions).toEqual([6, 12, 24, 48, 96]);

      done();
    }).catch(done);
  });

  it(`should render properly`, (done) => {
    comp.ngOnInit().then(() => {
      const albumsCount = comp.filtredAlbums.length;
      const albumsOnPageCount = Math.min(albumsCount, 6);

      expect(el.querySelector('[data-unit-test="albums-search-input"]').nodeName.toLowerCase()).toContain('input');
      expect(el.querySelector('[data-unit-test="albums-search-input"]').getAttribute("placeholder")).toContain('Search');

      expect(el.querySelectorAll('[data-unit-test="albums"] [data-unit-test="albums-items"]').length).toEqual(albumsOnPageCount);

      Array.from(el.querySelectorAll('[data-unit-test="albums"] [data-unit-test="albums-items"]')).forEach((albumItem, albumIndex) => {
        expect(albumItem.querySelectorAll('[data-unit-test="albums-item-pictures"] img').length).toBeGreaterThan(0);
        expect(albumItem.querySelector('[data-unit-test="albums-item-title"]').textContent).toContain(comp.filtredAlbums[albumIndex].title);
      });

      expect(el.querySelector('[data-unit-test="albums-pagination"] .mat-paginator-page-size-label').textContent).toContain('Items per page:');
      expect(el.querySelector('[data-unit-test="albums-pagination"] .mat-paginator-range-label').textContent).toContain('1 - ' + albumsOnPageCount + ' of ' + albumsCount);

      done();
    }).catch(done);
  });
});
