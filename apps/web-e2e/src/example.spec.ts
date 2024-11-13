import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // TODO: write useful tests
  await expect(page.getByTestId('dho-list-container')).toBeVisible();
});
