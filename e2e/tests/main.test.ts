import { test, expect } from "@playwright/test";

import { MainPage } from "./pom/MainPage.pom";

test.describe("Main", () => {
  test("Screenshot", { tag: "@screenshot" }, async ({ page }) => {
    await MainPage.open(page);

    await expect(page).toHaveScreenshot("main.png");
  });

  test("Anchor to github is present", async ({ page }) => {
    const mainPage = await MainPage.open(page);

    const current = await mainPage.header.buttonToRepo.getHref();

    const expected =
      "https://github.com/scale-visualizer/scale-visualizer.github.io";

    expect(current).toEqual(expected);
  });
});
