import {
    TestBed,
    async,
    ComponentFixture
} from '@angular/core/testing';
import {DebugElement} from '@angular/core';

import BaseTestingConfiguration from '../../spec/init';

import {AppComponent} from '../../components/app/index';

describe('AppComponent', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule(BaseTestingConfiguration).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  it(`should render properly`, () => {
    fixture.detectChanges();

    expect(el.querySelector('[data-unit-test="app-home-link"]').textContent).toContain('Users data');
    expect(el.querySelector('[data-unit-test="app-home-link"]').getAttribute('href')).toEqual('/users');

    expect(el.querySelector('[data-unit-test="app-users-link"]').textContent).toContain('Users');
    expect(el.querySelector('[data-unit-test="app-users-link"]').getAttribute('href')).toEqual('/users');

    expect(el.querySelector('[data-unit-test="app-albums-link"]').textContent).toContain('Albums');
    expect(el.querySelector('[data-unit-test="app-albums-link"]').getAttribute('href')).toEqual('/albums');

    expect(el.querySelector('[data-unit-test="app-photos-link"]').textContent).toContain('Photos');
    expect(el.querySelector('[data-unit-test="app-photos-link"]').getAttribute('href')).toEqual('/photos');

    expect(el.querySelector('[data-unit-test="app-search-link"]').getAttribute('aria-label')).toContain('Search');
    expect(el.querySelector('[data-unit-test="app-search-link"]').getAttribute('href')).toEqual('/search');
  });
});
