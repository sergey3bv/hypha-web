import { test, expect } from '@playwright/test';
import { MySpaces } from './pages/my-spaces.page';

test.describe('My Spaces Page', () => {
  let mySpacesPage: MySpaces;

  test.beforeEach(async ({ page }) => {
    mySpacesPage = new MySpaces(page);
    await mySpacesPage.open();
  });

  test('should display both member and recommended spaces sections', async () => {
    const visibility = await mySpacesPage.testVisibility();

    expect(visibility.memberSpaces).toBeTruthy();
    expect(visibility.recommendedSpaces).toBeTruthy();
  });
});
