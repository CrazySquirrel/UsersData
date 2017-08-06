import {browser, by, element} from 'protractor';

describe('Photos list page', () => {
  it('Photos list search', () => {
    browser.get('/photos');

    const paginationRangeLabel = element(by.css('[data-unit-test="photos-pagination"] .mat-paginator-range-label'));
    const searchInput = element(by.css('[data-unit-test="photos-search-input"]'));
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

  it('Photos list pagination', () => {
    browser.get('/photos');

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

  it('Photos list page photo popup', () => {
    browser.get('/photos');

    const firstPhoto = element(by.css('[data-unit-test="photos-item"]'));

    firstPhoto.click().then(() => {
      element.all(by.css('[data-unit-test="photo-preview-picture"]')).count().then((userCardsCount) => {
        expect(userCardsCount).toEqual(1);
      });
    });
  });
});
