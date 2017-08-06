import {TestBed, getTestBed, inject} from '@angular/core/testing';

import {HttpModule} from '@angular/http';

import {User} from '../../models/user';

import {UserService} from './index';

describe('UserService', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

  let injector;
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [UserService]
    });

    injector = getTestBed();
  });

  beforeEach(() => {
    service = injector.get(UserService);
  });


  it('getUsers', (done) => {
    service.getUsers().then(data => {
      expect(data).toBeArrayOfObjects();
      expect(data[0] instanceof User).toBeTrue();
      done();
    }).catch(done);
  });

  it('getUser', (done) => {
    service.getUser(1).then(data => {
      expect(data).toBeObject();
      expect(data instanceof User).toBeTrue();
      done();
    }).catch(done);
  });
});
