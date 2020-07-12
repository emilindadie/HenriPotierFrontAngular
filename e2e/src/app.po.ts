import { browser, by, element, ElementArrayFinder, ElementFinder } from 'protractor';

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
    by.css('app-root app-shell app-articles .articles-list-container .articles-list-container-item')) as ElementArrayFinder;
  }

  getAddPanierButtonItemArrayElement(): ElementArrayFinder {
    return element.all(
    by.css(
    'app-root app-shell app-articles .articles-list-container .articles-list-container-item .add-panier-button')) as ElementArrayFinder;
  }

  // Panier
  getPanierRouteTitleText(): Promise<string> {
    return element(by.css('app-root app-panier .panier-container h1')).getText() as Promise<string>;
  }

  getPanierMenuButtonElement(): ElementFinder {
    return element(by.css('app-root app-shell app-header .header-container .panier-item')) as ElementFinder;
  }

  // ALL
  getSnackBarElement(): ElementFinder {
    return element(by.css('.mat-snack-bar-container')) as ElementFinder;
  }
}

