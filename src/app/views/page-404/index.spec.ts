import {TestBed, async} from '@angular/core/testing';

import {Page404} from './index';

describe('Page404', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        Page404
      ],
    }).compileComponents();
  }));

  it('should create the page404', async(() => {
    const fixture = TestBed.createComponent(Page404);
    const page404 = fixture.debugElement.componentInstance;
    expect(page404).toBeTruthy();
  }));
});
