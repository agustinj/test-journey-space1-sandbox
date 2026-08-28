import { Page } from '@playwright/test';

export class ProductsPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('http://localhost:4200/');
  }

  async searchProduct(productName: string) {
    await this.page.locator('[data-test="search-query"]').fill(productName);
    await this.page.locator('[data-test="search-submit"]').click();
  }

  async selectProduct(productName: string) {
    await this.page.locator('.card', { hasText: productName }).click();
  }
}