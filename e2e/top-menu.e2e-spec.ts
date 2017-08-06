import {browser, by, element} from 'protractor';

describe('Top menu', () => {
  it('Home button', () => {
    browser.get('/');

    element(by.css('[data-unit-test="app-home-link"]')).click().then(() => {
      browser.getCurrentUrl().then((actualUrl) => {
        expect(actualUrl.indexOf("/users") !== -1).toEqual(true);
      });
    });
  });

  it('Users button', () => {
    browser.get('/');

    element(by.css('[data-unit-test="app-users-link"]')).click().then(() => {
      browser.getCurrentUrl().then((actualUrl) => {
        expect(actualUrl.indexOf("/users") !== -1).toEqual(true);
      });
    });
  });

  it('Albums button', () => {
    browser.get('/');

    element(by.css('[data-unit-test="app-albums-link"]')).click().then(() => {
      browser.getCurrentUrl().then((actualUrl) => {
        expect(actualUrl.indexOf("/albums") !== -1).toEqual(true);
      });
    });
  });

  it('Photos button', () => {
    browser.get('/');

    element(by.css('[data-unit-test="app-photos-link"]')).click().then(() => {
      browser.getCurrentUrl().then((actualUrl) => {
        expect(actualUrl.indexOf("/photos") !== -1).toEqual(true);
      });
    });
  });

  it('Search button', () => {
    browser.get('/');

    element(by.css('[data-unit-test="app-search-link"]')).click().then(() => {
      browser.getCurrentUrl().then((actualUrl) => {
        expect(actualUrl.indexOf("/search") !== -1).toEqual(true);
      });
    });
  });
});
