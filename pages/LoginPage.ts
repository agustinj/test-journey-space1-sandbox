import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('http://localhost:4200/auth/login', { waitUntil: 'networkidle' });
  }

  async login(email: string, password: string) {
    await this.page.locator('[data-test="email"]').fill(email);
    console.log('Email después de fill:', await this.page.locator('[data-test="email"]').inputValue());

    await this.page.locator('[data-test="password"]').fill(password);
    console.log('Password después de fill:', await this.page.locator('[data-test="password"]').inputValue());

    await this.page.locator('[data-test="login-submit"]').click();
  }
}