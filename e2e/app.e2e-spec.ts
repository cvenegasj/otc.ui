import { Otc.UiPage } from './app.po';

describe('otc.ui App', () => {
  let page: Otc.UiPage;

  beforeEach(() => {
    page = new Otc.UiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
