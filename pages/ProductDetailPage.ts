import { Page } from '@playwright/test';

export class ProductDetailPage {
  constructor(private page: Page) {}

  async getUnitPrice(): Promise<number> {
    const priceText = await this.page.locator('[data-test="unit-price"]').innerText();
    return parseFloat(priceText);
  }

  async setQuantity(quantity: number) {
    await this.page.locator('[data-test="quantity"]').fill(quantity.toString());
  }

  async addToCart() {
    await this.page.locator('[data-test="add-to-cart"]').click();
    await this.page.locator('[data-test="cart-quantity"]').waitFor({ state: 'visible' });
  }
}