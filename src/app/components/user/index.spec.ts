import {
    TestBed,
    async,
    ComponentFixture
} from '@angular/core/testing';
import {DebugElement} from '@angular/core';

import BaseTestingConfiguration from '../../spec/init';

import {User} from '../../models/user';

import {UserComponent} from '../../components/user/index';

describe('UserComponent', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

  let comp: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule(BaseTestingConfiguration).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  it(`should have init properties`, () => {
    expect(comp.preloader).toBeTrue();
    expect(comp.user).toBeUndefined();
  });

  it(`should have main properties`, (done) => {
    comp.ngOnInit().then(() => {
      expect(comp.preloader).toBeFalse();

      expect(comp.user).toBeObject();
      expect(comp.user instanceof User).toBeTrue();

      done();
    }).catch(done);
  });

  it(`should render properly`, (done) => {
    comp.ngOnInit().then(() => {
      expect(el.querySelector('[data-unit-test="user-item-name"]').textContent).toContain(comp.user.name);
      expect(el.querySelector('[data-unit-test="user-item-email"]').textContent).toContain(comp.user.email);
      expect(el.querySelector('[data-unit-test="user-item-phone"]').textContent).toContain(comp.user.phone);
      expect(el.querySelector('[data-unit-test="user-item-website"]').textContent).toContain(comp.user.website);
      expect(el.querySelector('[data-unit-test="user-item-address"]').textContent).toContain(comp.user.address.zipcode);
      expect(el.querySelector('[data-unit-test="user-item-address"]').textContent).toContain(comp.user.address.city);
      expect(el.querySelector('[data-unit-test="user-item-address"]').textContent).toContain(comp.user.address.street);
      expect(el.querySelector('[data-unit-test="user-item-address"]').textContent).toContain(comp.user.address.suite);
      expect(el.querySelectorAll('[data-unit-test="user-albums"] img').length).toBeGreaterThan(0);
      expect(el.querySelector('[data-unit-test="user-back"]').textContent).toContain('Back');
      done();
    }).catch(done);
  });
});
