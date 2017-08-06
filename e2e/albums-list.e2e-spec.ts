import {browser, by, element} from 'protractor';

describe('Albums list page', () => {
  it('Albums list search', () => {
    browser.get('/albums');

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

  it('Albums list pagination', () => {
    browser.get('/albums');

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

  it('Albums list album detail page', () => {
    browser.get('/albums');

    const firstAlbumTitle = element(by.css('[data-unit-test="albums-item"]'));

    firstAlbumTitle.click().then(() => {
      browser.getCurrentUrl().then((actualUrl) => {
        expect(actualUrl.indexOf("/album/") !== -1).toEqual(true);
      });
    });
  });
});
