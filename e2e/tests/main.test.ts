import { test, expect } from "@playwright/test";

test.describe("Main", () => {
  test("Screenshot", { tag: "@screenshot" }, async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveScreenshot("main.png");
  });

  test("Count is working", async ({ page }) => {
    await page.goto("/");

    const button = page.getByRole("button", { name: "count is 0" });

    await button.click();

    await expect(
      page.getByRole("button", { name: "count is 1" }),
    ).toBeVisible();
  });
});
