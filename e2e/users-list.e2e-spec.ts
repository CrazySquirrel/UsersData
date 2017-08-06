import {browser, by, element} from 'protractor';

describe('users-data App', () => {
  it('Users list search', () => {
    browser.get('/users');

    const paginationRangeLabel = element(by.css('[data-unit-test="users-pagination"] .mat-paginator-range-label'));
    const searchInput = element(by.css('[data-unit-test="users-search-input"]'));
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

  it('Users list pagination', () => {
    browser.get('/users');

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

  it('Users list user detail page', () => {
    browser.get('/users');

    const firstUserCard = element(by.css('[data-unit-test="users-card-name"]'));

    firstUserCard.click().then(() => {
      browser.getCurrentUrl().then((actualUrl) => {
        expect(actualUrl.indexOf("/user/") !== -1).toEqual(true);
      });
    });
  });
});
