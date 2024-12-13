import { Locator, Page } from '@playwright/test';

export class MemberSpaces {
  readonly container: Locator;

  constructor(page: Page) {
    this.container = page.getByTestId('member-spaces-container');
  }

  async isVisible() {
    return await this.container.isVisible();
  }
}
