import { Before, Then } from 'cucumber';
import { expect } from 'chai';
import { browser } from 'protractor';
import { AppPage } from '../app.po';

let page: AppPage;

Before(() => {
  page = new AppPage();
});

Then(/^I should see articles loaded$/, async () => {
  await browser.waitForAngularEnabled(false);
  const element = await page.getArticlesItemArrayElement();
  expect(element.length > 0).to.equal(true);
});
