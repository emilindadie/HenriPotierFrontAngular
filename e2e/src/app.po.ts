import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getInitialRouteTitleText(): Promise<string> {
    return element(by.css('app-root app-article h1')).getText() as Promise<string>;
  }

  navigateToCustomRoute(route: string) {
    return browser.get(`${browser.baseurl}/${route}`);
  }
}
