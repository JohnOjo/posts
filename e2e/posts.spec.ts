import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('has title', async ({ page }) => {
  await expect(page).toHaveTitle(/Posts/);
});

test('should display the header with bouncing dots', async ({ page }) => {
  await expect(page.locator('.header-block')).toBeVisible();
  await expect(page.locator('.header')).toHaveText('Posts');
  await expect(page.locator('.dot')).toHaveCount(8);
});

// test('should display loading message while loading', async ({ page }) => {
//   // Simulate loading state (you might need to mock API responses or use a delay)
//   await page.route('**/api/posts', (route) =>
//     route.fulfill({ status: 200, body: '[]', delay: 1000 })
//   );
//   await page.reload();
//   await expect(page.locator('h3')).toContainText('Loading ...');
// });

test('should display posts when loaded', async ({ page }) => {
  // Simulate successful API response
  await page.route('**/api/posts', (route) =>
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
