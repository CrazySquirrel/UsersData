import {browser, by, element} from 'protractor';

describe('Search page', () => {
  it('Search page users search', () => {
    browser.get('/search');

    const paginationRangeLabel = element(by.css('[data-unit-test="users-pagination"] .mat-paginator-range-label'));
    const searchInput = element(by.css('[data-unit-test="search-input"]'));
    const firstUserCard = element(by.css('[data-unit-test="users-card-name"]'));

    element(by.css('[data-unit-test="users-pagination"] .mat-select-value-text')).getText().then((pageSize) => {
      expect(paginationRangeLabel.getText()).toContain('1 - ' + pageSize);
      searchInput.sendKeys(firstUserCard.getText()).then(() => {
        element.all(by.css('[data-unit-test="users-card-name"]')).count().then((userCardsCount) => {
          expect(paginationRangeLabel.getText()).toContain('1 - ' + userCardsCount + ' of ' + userCardsCount);
        });
      });
    });
  });

  it('Search page users pagination', () => {
    browser.get('/search');

    const paginationRangeLabel = element(by.css('[data-unit-test="users-pagination"] .mat-paginator-range-label'));
    const paginationPrevButton = element(by.css('[data-unit-test="users-pagination"] .mat-paginator-navigation-previous'));
    const paginationNextButton = element(by.css('[data-unit-test="users-pagination"] .mat-paginator-navigation-next'));

    Promise.all([
      element(by.css('[data-unit-test="users-card-name"]')).getText(),
      paginationRangeLabel.getText()
    ]).then((result) => {
      const firstPageUserName = result[0];
      const firstPagePaginationLabelText = result[1];

      paginationNextButton.click().then(() => {
        Promise.all([
          element(by.css('[data-unit-test="users-card-name"]')).getText(),
          paginationRangeLabel.getText()
        ]).then((_result) => {
          const secondPageUserName = _result[0];
          const secondPagePaginationLabelText = _result[1];

          paginationPrevButton.click().then(() => {
            Promise.all([
              element(by.css('[data-unit-test="users-card-name"]')).getText(),
              paginationRangeLabel.getText()
            ]).then((__result) => {
              const thirdPageUserName = __result[0];
              const thirdPagePaginationLabelText = __result[1];

              expect(firstPageUserName).toEqual(thirdPageUserName);
              expect(firstPagePaginationLabelText).toEqual(thirdPagePaginationLabelText);

              expect(firstPageUserName).not.toEqual(secondPageUserName);
              expect(firstPagePaginationLabelText).not.toEqual(secondPagePaginationLabelText);
            });
          });
        });
      });
    });
  });

  it('Search page albums search', () => {
    browser.get('/search');

    const paginationRangeLabel = element(by.css('[data-unit-test="albums-pagination"] .mat-paginator-range-label'));
    const searchInput = element(by.css('[data-unit-test="search-input"]'));
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

  it('Search page albums pagination', () => {
    browser.get('/search');

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

  it('Search page photos search', () => {
    browser.get('/search');

    const paginationRangeLabel = element(by.css('[data-unit-test="photos-pagination"] .mat-paginator-range-label'));
    const searchInput = element(by.css('[data-unit-test="search-input"]'));
    const firstPhotoTitle = element(by.css('[data-unit-test="photos-item-title"]'));

    element(by.css('[data-unit-test="photos-pagination"] .mat-select-value-text')).getText().then((pageSize) => {
      expect(paginationRangeLabel.getText()).toContain('1 - ' + pageSize);
      searchInput.sendKeys(firstPhotoTitle.getText()).then(() => {
        element.all(by.css('[data-unit-test="photos-item-title"]')).count().then((userCardsCount) => {
          expect(paginationRangeLabel.getText()).toContain('1 - ' + userCardsCount + ' of ' + userCardsCount);
        });
      });
    });
  });

  it('Search page photos pagination', () => {
    browser.get('/search');

    const paginationRangeLabel = element(by.css('[data-unit-test="photos-pagination"] .mat-paginator-range-label'));
    const paginationPrevButton = element(by.css('[data-unit-test="photos-pagination"] .mat-paginator-navigation-previous'));
    const paginationNextButton = element(by.css('[data-unit-test="photos-pagination"] .mat-paginator-navigation-next'));

    Promise.all([
      element(by.css('[data-unit-test="photos-item-title"]')).getText(),
      paginationRangeLabel.getText()
    ]).then((result) => {
      const firstPagePhotoTitle = result[0];
      const firstPagePaginationLabelText = result[1];

      paginationNextButton.click().then(() => {
        Promise.all([
          element(by.css('[data-unit-test="photos-item-title"]')).getText(),
          paginationRangeLabel.getText()
        ]).then((_result) => {
          const secondPagePhotoTitle = _result[0];
          const secondPagePaginationLabelText = _result[1];

          paginationPrevButton.click().then(() => {
            Promise.all([
              element(by.css('[data-unit-test="photos-item-title"]')).getText(),
              paginationRangeLabel.getText()
            ]).then((__result) => {
              const thirdPagePhotoTitle = __result[0];
              const thirdPagePaginationLabelText = __result[1];

              expect(firstPagePhotoTitle).toEqual(thirdPagePhotoTitle);
              expect(firstPagePaginationLabelText).toEqual(thirdPagePaginationLabelText);

              expect(firstPagePhotoTitle).not.toEqual(secondPagePhotoTitle);
              expect(firstPagePaginationLabelText).not.toEqual(secondPagePaginationLabelText);
            });
          });
        });
      });
    });
  });
});
