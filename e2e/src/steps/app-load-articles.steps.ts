import { Before, Then } from 'cucumber';
import { expect } from 'chai';
import { ArticlePage } from '../article.po';
import { browser } from 'protractor';

let page: ArticlePage;

Before(() => {
  page = new ArticlePage();
});

Then(/^I should see articles loaded$/, async () => {
    await browser.waitForAngularEnabled(false);
    const element = await page.getArticleItem();
    expect(element.length > 0).to.equal(true);
});
