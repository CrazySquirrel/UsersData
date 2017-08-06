import {browser, by, element} from 'protractor';

describe('users-data App', () => {
  it('Home redirect', () => {
    browser.get('/');

    browser.getCurrentUrl().then((actualUrl) => {
      expect(actualUrl.indexOf("/users") !== -1).toEqual(true);
    });
  });
});
