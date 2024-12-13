import { test, expect } from '@playwright/test';
import { MySpaces } from './pages/my-spaces.page';

test('should display spaces list', async ({ page }) => {
  const mySpacesPage = new MySpaces(page);

  await mySpacesPage.open();
  await expect(await mySpacesPage.isListContainerVisible()).toBeTruthy();
});
