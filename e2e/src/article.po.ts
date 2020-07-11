import { browser, by, element, ElementArrayFinder } from 'protractor';

export class ArticlePage {
    navigateTo(): Promise<unknown> {
      return browser.get(browser.baseUrl) as Promise<unknown>;
    }

    getArticleItem(): ElementArrayFinder {
    return element.all(by.css('app-root app-article .article-container .article-item')) as ElementArrayFinder;
    }
  }
