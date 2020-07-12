import { Before, Then, When } from 'cucumber';
import { expect } from 'chai';
import { AppPage } from '../app.po';
import { browser, ElementFinder } from 'protractor';
let page: AppPage;

Before(() => {
  page = new AppPage();
});

When(/^I click on panier menu button$/, async () => {
    await browser.waitForAngularEnabled(false);
    const element: ElementFinder = await page.getPanierMenuButtonElement();
    expect(await element.isPresent()).to.equal(true);
    await element.click();
});

Then(/^I should see panier page title$/, async () => {
    await browser.waitForAngularEnabled(false);
    expect(await page.getPanierRouteTitleText()).to.equal('Panier page');
});
