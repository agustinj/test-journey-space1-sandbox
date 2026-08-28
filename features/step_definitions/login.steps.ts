import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { page } from './hooks';
import * as dotenv from 'dotenv';

dotenv.config();

let loginPage: LoginPage;

Given('el usuario está en la página de login', { timeout: 30000 }, async function () {
  loginPage = new LoginPage(page);
  await loginPage.goto();
});

When('ingresa credenciales válidas', { timeout: 30000 }, async function () {
  const email = process.env.TOOLSHOP_EMAIL!;
  const password = process.env.TOOLSHOP_PASSWORD!;
  await loginPage.login(email, password);
});

Then('accede a su cuenta', { timeout: 30000 }, async function () {
  await expect(page.locator('[data-test="page-title"]')).toBeVisible();
});