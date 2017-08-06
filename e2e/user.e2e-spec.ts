import {browser, by, element} from 'protractor';

describe('User detail page', () => {
  it('User detail page search', () => {
    browser.get('/user/1');

    const paginationRangeLabel = element(by.css('[data-unit-test="albums-pagination"] .mat-paginator-range-label'));
    const searchInput = element(by.css('[data-unit-test="albums-search-input"]'));
    const firstAlbumTitle = element(by.css('[data-unit-test="albums-item-title"]'));

    element(by.css('[data-unit-test="albums-pagination"] .mat-select-value-text')).getText().then((pageSize) => {
      expect(paginationRangeLabel.getText()).toContain('1 - ' + pageSize);
      searchInput.sendKeys(firstAlbumTitle.getText()).then(() => {
        element.all(by.css('[data-unit-test="albums-item-title"]')).count().then((userCardsCount) => {
          expect(paginationRangeLabel.getText()).toContain('1 - ' + userCardsCount + ' of ' + userCardsCount);
        });
      });
    });
  });

  it('User detail page pagination', () => {
    browser.get('/user/1');

    const paginationRangeLabel = element(by.css('[data-unit-test="albums-pagination"] .mat-paginator-range-label'));
    const paginationPrevButton = element(by.css('[data-unit-test="albums-pagination"] .mat-paginator-navigation-previous'));
    const paginationNextButton = element(by.css('[data-unit-test="albums-pagination"] .mat-paginator-navigation-next'));

    Promise.all([
      element(by.css('[data-unit-test="albums-item-title"]')).getText(),
      paginationRangeLabel.getText()
    ]).then((result) => {
      const firstPageAlbumTitle = result[0];
      const firstPagePaginationLabelText = result[1];

      paginationNextButton.click().then(() => {
        Promise.all([
          element(by.css('[data-unit-test="albums-item-title"]')).getText(),
          paginationRangeLabel.getText()
        ]).then((_result) => {
          const secondPageAlbumTitle = _result[0];
          const secondPagePaginationLabelText = _result[1];

          paginationPrevButton.click().then(() => {
            Promise.all([
              element(by.css('[data-unit-test="albums-item-title"]')).getText(),
              paginationRangeLabel.getText()
            ]).then((__result) => {
              const thirdPageAlbumTitle = __result[0];
              const thirdPagePaginationLabelText = __result[1];

              expect(firstPageAlbumTitle).toEqual(thirdPageAlbumTitle);
              expect(firstPagePaginationLabelText).toEqual(thirdPagePaginationLabelText);

              expect(firstPageAlbumTitle).not.toEqual(secondPageAlbumTitle);
              expect(firstPagePaginationLabelText).not.toEqual(secondPagePaginationLabelText);
            });
          });
        });
      });
    });
  });

  it('User detail page back', () => {
    browser.get('/users');
    browser.get('/user/1');

    const goBackButton = element(by.css('[data-unit-test="user-back"]'));

    goBackButton.click().then(() => {
      browser.getCurrentUrl().then((actualUrl) => {
        expect(actualUrl.indexOf("/users") !== -1).toEqual(true);
      });
    });
  });

  it('User detail page album detail page', () => {
    browser.get('/user/1');

    const firstAlbum = element(by.css('[data-unit-test="albums-item"]'));

    firstAlbum.click().then(() => {
      browser.getCurrentUrl().then((actualUrl) => {
        expect(actualUrl.indexOf("/album/") !== -1).toEqual(true);
      });
    });
  });
});
