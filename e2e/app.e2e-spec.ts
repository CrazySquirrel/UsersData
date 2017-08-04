import { UsersDataPage } from './app.po';

describe('users-data App', () => {
  let page: UsersDataPage;

  beforeEach(() => {
    page = new UsersDataPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
