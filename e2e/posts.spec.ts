import { test, expect } from '@playwright/test';
import { environment } from '../src/environments/environment';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('has title', async ({ page }) => {
  await expect(page).toHaveTitle(/Posts/);
});

test('should display the header', async ({ page }) => {
  await expect(page.locator('.header-block')).toBeVisible();
  await expect(page.locator('h1')).toHaveText('Posts');
  await expect(page.locator('.dot')).toHaveCount(8);
});

test('should display posts when loaded', async ({ page }) => {
  await page.route(environment.baseURL+'/posts', (route) =>
    route.fulfill({
      status: 200,
      body: JSON.stringify([
        { id: 1, title: 'Test title', body: 'Test body', userId: 1 },
        { id: 2, title: 'Test title 2', body: 'Test body 2', userId: 1 },
      ]),
    })
  );
  await page.reload();

  await expect(page.locator('app-card')).toHaveCount(2);
  await expect(page.locator('app-card:first-child')).toContainText(
    'Test title'
  );
});
