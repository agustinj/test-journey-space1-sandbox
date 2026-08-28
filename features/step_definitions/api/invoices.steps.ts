import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { InvoicesClient } from '../../../api/InvoicesClient';
import { apiContext, setApiResponse, apiResponse } from '../hooks';
import { CartsClient } from '../../../api/CartsClient';
import { AuthClient } from '../../../api/AuthClient';

let invoicesClient: InvoicesClient;

const sampleInvoiceBody = {
  billing_street: 'Haag Shores',
  billing_city: 'Mortonfort',
  billing_state: 'Iowa',
  billing_country: 'US',
  billing_postal_code: '28042',
  payment_method: 'cash-on-delivery',
  cart_id: 'some-cart-id',
  payment_details: {},
};

When('se intenta crear una orden sin header de autorización', { timeout: 30000 }, async function () {
  invoicesClient = new InvoicesClient(apiContext);
  setApiResponse(await invoicesClient.createInvoice(sampleInvoiceBody));
});

When('se intenta crear una orden con autorización incorrecta', { timeout: 30000 }, async function () {
  invoicesClient = new InvoicesClient(apiContext);
  setApiResponse(await invoicesClient.createInvoice(sampleInvoiceBody, 'token-invalido-123'));
});

// BUG conocido: se espera 422 (carrito vacío rechazado), pero la API devuelve 201.
// Ver reporte: [referencia al reporte que se armó con Dave/Megan]
When('se intenta crear una orden con el carrito vacío', { timeout: 30000 }, async function () {
  const cartsClient = new CartsClient(apiContext);
  const authClient = new AuthClient(apiContext);
  invoicesClient = new InvoicesClient(apiContext);

  const cartResponse = await cartsClient.createCart();
  const cartBody = await cartResponse.json();
  const cartId = cartBody.id;

  const loginResponse = await authClient.login('customer@practicesoftwaretesting.com', 'welcome01');
  const loginBody = await loginResponse.json();
  const token = loginBody.access_token;

  const bodyWithEmptyCart = { ...sampleInvoiceBody, cart_id: cartId };

  const response = await invoicesClient.createInvoice(bodyWithEmptyCart, token);
  const responseBody = await response.json();

  setApiResponse(response);
});

Then('la respuesta incluye el mensaje {string}', { timeout: 30000 }, async function (expectedMessage: string) {
  const body = await apiResponse.json();
  expect(body.message).toBe(expectedMessage);
});