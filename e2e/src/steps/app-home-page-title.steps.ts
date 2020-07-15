import { Before, Given, Then, When } from 'cucumber';
import { expect } from 'chai';
import { AppPage } from '../app.po';

let page: AppPage;

Before(() => {
  page = new AppPage();
});

Given(/^I am on the home page$/, async () => {
  await page.navigateTo();
});

When(/^I do nothing$/, () => {});

Then(/^I should see home page title$/, async () => {
  expect(await page.getInitialRouteTitleText()).to.equal('Article page');
});
