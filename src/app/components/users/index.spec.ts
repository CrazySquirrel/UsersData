import {
    TestBed,
    async,
    ComponentFixture
} from '@angular/core/testing';
import {DebugElement} from '@angular/core';

import BaseTestingConfiguration from '../../spec/init';

import {User} from '../../models/user';

import {UsersComponent} from '../../components/users/index';

describe('UsersComponent', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

  let comp: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule(BaseTestingConfiguration).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

  it(`should have init properties`, () => {
    expect(comp.preloader).toBeTrue();

    expect(comp.allUsers).toBeUndefined();
    expect(comp.filtredUsers).toBeUndefined();

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

      expect(comp.allUsers).toBeArrayOfObjects();
      expect(comp.allUsers[0] instanceof User).toBeTrue();

      expect(comp.filtredUsers).toBeArrayOfObjects();
      expect(comp.filtredUsers[0] instanceof User).toBeTrue();

      expect(comp.pageEvent).toEqual({
        pageIndex: 0,
        pageSize: 6,
        length: comp.allUsers.length
      });
      expect(comp.pageSize).toEqual(6);
      expect(comp.pageSizeOptions).toEqual([6, 12, 24, 48, 96]);

      done();
    }).catch(done);
  });

  it(`should render properly`, (done) => {
    comp.ngOnInit().then(() => {
      const usersCount = comp.filtredUsers.length;
      const usersOnPageCount = Math.min(usersCount, 6);

      expect(el.querySelector('[data-unit-test="users-search-input"]').nodeName.toLowerCase()).toContain('input');
      expect(el.querySelector('[data-unit-test="users-search-input"]').getAttribute("placeholder")).toContain('Search');

      expect(el.querySelectorAll('[data-unit-test="users"] [data-unit-test="users-card"]').length).toEqual(usersOnPageCount);

      Array.from(el.querySelectorAll('[data-unit-test="users"] [data-unit-test="users-card"]')).forEach((userItem, userIndex) => {
        expect(userItem.querySelector('[data-unit-test="users-item-name"]').textContent).toContain(comp.filtredUsers[userIndex].name);
        expect(userItem.querySelector('[data-unit-test="users-item-email"]').textContent).toContain(comp.filtredUsers[userIndex].email);
        expect(userItem.querySelector('[data-unit-test="users-item-phone"]').textContent).toContain(comp.filtredUsers[userIndex].phone);
        expect(userItem.querySelector('[data-unit-test="users-item-website"]').textContent).toContain(comp.filtredUsers[userIndex].website);
        expect(userItem.querySelector('[data-unit-test="users-item-address"]').textContent).toContain(comp.filtredUsers[userIndex].address.zipcode);
        expect(userItem.querySelector('[data-unit-test="users-item-address"]').textContent).toContain(comp.filtredUsers[userIndex].address.city);
        expect(userItem.querySelector('[data-unit-test="users-item-address"]').textContent).toContain(comp.filtredUsers[userIndex].address.street);
        expect(userItem.querySelector('[data-unit-test="users-item-address"]').textContent).toContain(comp.filtredUsers[userIndex].address.suite);
      });

      expect(el.querySelector('[data-unit-test="users-pagination"] .mat-paginator-page-size-label').textContent).toContain('Items per page:');
      expect(el.querySelector('[data-unit-test="users-pagination"] .mat-paginator-range-label').textContent).toContain('1 - ' + usersOnPageCount + ' of ' + usersCount);

      done();
    }).catch(done);
  });
});
