import {
    TestBed,
    async,
    ComponentFixture
} from '@angular/core/testing';
import {DebugElement} from '@angular/core';

import BaseTestingConfiguration from '../../spec/init';

import {PhotoPreviewDialog} from '../../components/photo-preview/index';

describe('PhotosComponent', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

  let comp: PhotoPreviewDialog;
  let fixture: ComponentFixture<PhotoPreviewDialog>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule(BaseTestingConfiguration).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoPreviewDialog);
    comp = fixture.componentInstance;
    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });
});
