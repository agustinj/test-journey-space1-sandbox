import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.locator('[data-test="nav-cart"]').click();
    await this.page.locator('[data-test="cart-total"]').waitFor({ state: 'visible' });
  }

  async getProductTitle(): Promise<string> {
    return (await this.page.locator('[data-test="product-title"]').innerText()).trim();
  }

  async getProductPrice(): Promise<number> {
    const priceText = await this.page.locator('[data-test="product-price"]').innerText();
    return parseFloat(priceText.replace('$', ''));
  }

  async setQuantity(quantity: number) {
    await this.page.locator('[data-test="product-quantity"]').fill(quantity.toString());
    await this.page.locator('[data-test="product-quantity"]').press('Tab');
  }

  async getLinePrice(): Promise<number> {
    const priceText = await this.page.locator('[data-test="line-price"]').innerText();
    return parseFloat(priceText.replace('$', ''));
  }

  async getCartTotal(): Promise<number> {
    const totalText = await this.page.locator('[data-test="cart-total"]').innerText();
    return parseFloat(totalText.replace('$', ''));
  }

  async removeProduct(productName: string) {
    const row = this.page.locator('tr', { hasText: productName });
    await row.locator('a.btn-danger').click();
    await row.waitFor({ state: 'detached' });
  }

  async getEmptyCartMessage(): Promise<string> {
    return await this.page.getByText('The cart is empty. Nothing to display.').innerText();
  }

  async isProceedToCheckoutVisible(): Promise<boolean> {
    return await this.page.locator('[data-test="proceed-1"]').isVisible();
  }
}