import { browser, by, element, ElementArrayFinder } from 'protractor';

export class ArticlePage {
    navigateTo(): Promise<unknown> {
      return browser.get(browser.baseUrl) as Promise<unknown>;
    }

    getArticleItem(): ElementArrayFinder {
        return element.all(
        by.scss('app-root app-articles-list .articles-list-container .articles-list-container-item')) as ElementArrayFinder;
    }

    getInitialRouteTitleText(): Promise<string> {
        return element(by.scss('app-root app-articles-list .articles-list-container h1')).getText() as Promise<string>;
    }
  }
