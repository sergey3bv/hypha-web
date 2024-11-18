import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/my-spaces');

  // TODO: write useful tests
  await expect(page.getByTestId('dho-list-container')).toBeVisible();
});
