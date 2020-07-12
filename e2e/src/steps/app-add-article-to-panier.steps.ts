import { Before, Then, When } from 'cucumber';
import { expect } from 'chai';
import { AppPage } from '../app.po';
import { browser, ElementFinder, ElementArrayFinder } from 'protractor';
let page: AppPage;

Before(() => {
  page = new AppPage();
});

When(/^I add one article into the panier$/, async () => {
    await browser.waitForAngularEnabled(false);
    const element = await page.getAddPanierButtonItemArrayElement();
    expect(await element[0].isPresent()).to.equal(true);
    await element[0].click();
});

Then(/^I should see article successfully added into the panier$/, async () => {
    await browser.waitForAngularEnabled(false);
    expect(await page.getSnackBarElement().isPresent()).to.equal(true);
});
