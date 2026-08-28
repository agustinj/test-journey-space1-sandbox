import { Page } from '@playwright/test';

export class NavigationPage {
  constructor(private page: Page) {}

  async isCartIconVisible(): Promise<boolean> {
    return await this.page.locator('[data-test="nav-cart"]').isVisible();
  }
}