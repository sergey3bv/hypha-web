import { Locator, Page } from '@playwright/test';

export class RecommendedSpaces {
  readonly container: Locator;

  constructor(page: Page) {
    this.container = page.getByTestId('recommended-spaces-container');
  }

  async isVisible() {
    return await this.container.isVisible();
  }
}
