import type { Locator } from "@playwright/test";

export class ButtonToRepo {
  static init = async (headerNode: Locator) => {
    const anchorNode = await headerNode.locator("a");
    return new ButtonToRepo(anchorNode);
  };

  constructor(private readonly anchorNode: Locator) {}

  getHref = () => {
    return this.anchorNode.getAttribute("href");
  };
}
