import {
    TestBed,
    async,
    ComponentFixture
} from '@angular/core/testing';
import {DebugElement} from '@angular/core';

import BaseTestingConfiguration from '../../spec/init';

import {SearchComponent} from '../../components/search/index';

describe('SearchComponent', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

  let comp: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule(BaseTestingConfiguration).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  it(`should render properly`, () => {
    fixture.detectChanges();

    expect(el.querySelector('[data-unit-test="search-input"]').nodeName.toLowerCase()).toContain('input');
    expect(el.querySelector('[data-unit-test="search-input"]').getAttribute("placeholder")).toContain('Search');
  });
});
