import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { apiResponse } from '../hooks';

Then('el status code de la respuesta es {int}', { timeout: 30000 }, async function (expectedStatus: number) {
  expect(apiResponse.status()).toBe(expectedStatus);
});