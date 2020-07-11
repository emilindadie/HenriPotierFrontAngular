import { browser, by, element, ElementArrayFinder } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getInitialRouteTitleText(): Promise<string> {
    return element(by.css('app-root app-articles-list .articles-list-container h1')).getText() as Promise<string>;
  }

  navigateToCustomRoute(route: string) {
    return browser.get(`${browser.baseurl}/${route}`);
  }
}
