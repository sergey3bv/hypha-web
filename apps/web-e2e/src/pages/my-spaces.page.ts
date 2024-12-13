import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class MySpaces extends BasePage {
  readonly listContainer: Locator;

  constructor(page: Page) {
    super(page);
    this.listContainer = page.getByTestId('dho-list-container');
  }

  async open() {
    await this.page.goto('/my-spaces');
    await this.waitForPageLoad();
  }

  async isListContainerVisible() {
    return await this.listContainer.isVisible();
  }
}
