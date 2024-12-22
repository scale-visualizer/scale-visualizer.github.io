import { test, expect } from '@playwright/test';

test('has title', async ({ page, baseURL }) => {
  await page.goto(baseURL);

  // Expect h1 to contain a substring.
  expect(await page.locator('h1').innerText()).toContain('Welcome');
});
