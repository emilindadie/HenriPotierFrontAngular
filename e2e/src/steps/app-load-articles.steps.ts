import { Before, Then,  } from 'cucumber';
import { expect } from 'chai';
import { ArticlePage } from '../article.po';

let page: ArticlePage;

Before(() => {
  page = new ArticlePage();
});

Then(/^I should see articles loaded$/, async () => {
    expect(await page.getArticleItem().length > 0).to.equal(true);
});
