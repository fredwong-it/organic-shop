import { OrganicShopPage } from './app.po';

describe('organic-shop App', () => {
  let page: OrganicShopPage;

  beforeEach(() => {
    page = new OrganicShopPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
