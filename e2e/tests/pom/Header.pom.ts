import type { Locator } from "@playwright/test";
import { ButtonToRepo } from "./ButtonToRepo.pom";

export class Header {
  static init = async (rootNode: Locator) => {
    const headerNode = await rootNode.locator("header");
    const buttonToRepo = await ButtonToRepo.init(headerNode);

    return new Header(headerNode, buttonToRepo);
  };

  constructor(
    private readonly headerNode: Locator,
    readonly buttonToRepo: ButtonToRepo,
  ) {}
}
