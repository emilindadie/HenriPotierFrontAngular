import { browser, by, element, ElementArrayFinder, ElementFinder, protractor } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getInitialRouteTitleText(): Promise<string> {
    return element(by.css('app-root app-shell app-articles .articles-list-container h1')).getText() as Promise<string>;
  }

  navigateToCustomRoute(route: string) {
    return browser.get(`${browser.baseurl}/${route}`);
  }


  // Article
  getArticlesItemArrayElement(): ElementArrayFinder {
    return element.all(
    by.css('app-root app-shell app-articles .articles-list-container .articles-list-container-item-mat-card')) as ElementArrayFinder;
  }

  getMatButtonFirstGridElement() {
    const EC =  protractor.ExpectedConditions;
    const button = element.all(by.css('.mat-button'));
    browser.wait(EC.presenceOf(button.get(0)));
    browser.wait(EC.elementToBeClickable(button.get(0)));
    return button.get(0);
  }

  // Panier
  getPanierRouteTitleText(): Promise<string> {
    return element(by.css('app-root app-panier .panier-container h1')).getText() as Promise<string>;
  }

  getFirstPanierGridElement(): ElementFinder {
    const EC =  protractor.ExpectedConditions;
    const gridTile = element.all(by.css('.mat-button'));
    browser.wait(EC.presenceOf(gridTile.get(0)));
    browser.wait(EC.elementToBeClickable(gridTile.get(0)));
    return gridTile.get(0);
  }



  // ALL
  getSnackBarElement(): ElementFinder {
    return element(by.css('.mat-snack-bar-container')) as ElementFinder;
  }

  getPanierMenuButtonElement(): ElementFinder {
    return element(by.css('app-root app-shell app-header .header-container .panier-item')) as ElementFinder;
  }
}

