import { Given, When, Then } from '@cucumber/cucumber';
import { expect, APIResponse } from '@playwright/test';
import { AuthClient } from '../../../api/AuthClient';
import { apiContext, apiResponse, setApiResponse } from '../hooks';

let authClient: AuthClient;

When('se hace login con email {string} y password {string}', { timeout: 30000 }, async function (email: string, password: string) {
  authClient = new AuthClient(apiContext);
  setApiResponse(await authClient.login(email, password));
});

Then('la respuesta incluye un {string} no vacío', { timeout: 30000 }, async function (fieldName: string) {
  const body = await apiResponse.json();
  expect(body[fieldName]).toBeTruthy();
});

Then('el {string} es {string}', { timeout: 30000 }, async function (fieldName: string, expectedValue: string) {
  const body = await apiResponse.json();
  expect(body[fieldName]).toBe(expectedValue);
});

Then('{string} es un valor numérico', { timeout: 30000 }, async function (fieldName: string) {
  const body = await apiResponse.json();
  expect(typeof body[fieldName]).toBe('number');
});