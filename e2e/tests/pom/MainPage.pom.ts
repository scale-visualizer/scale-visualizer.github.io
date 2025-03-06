import type { Page } from "@playwright/test";

import { Header } from "./Header.pom";

export class MainPage {
  static open = async (page: Page) => {
    await page.goto("/");

    const rootNode = await page.locator("#root > div");

    const header = await Header.init(rootNode);

    return new MainPage(page, header);
  };

  constructor(
    private readonly page: Page,
    readonly header: Header,
  ) {}
}
