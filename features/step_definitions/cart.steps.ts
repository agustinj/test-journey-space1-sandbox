import { Given, When, Then } from '@cucumber/cucumber';
import { ProductsPage } from '../../pages/ProductsPage';
import { ProductDetailPage } from '../../pages/ProductDetailPage';
import { page } from './hooks';
import { CartPage } from '../../pages/CartPage';
import { expect } from '@playwright/test';
import { NavigationPage } from '../../pages/NavigationPage';

let productsPage: ProductsPage;
let productDetailPage: ProductDetailPage;
let cartPage: CartPage;
let addedPrices: number[] = [];

Given('el usuario está en la página de inicio', { timeout: 30000 }, async function () {
  productsPage = new ProductsPage(page);
  productDetailPage = new ProductDetailPage(page);
  cartPage = new CartPage(page);
  addedPrices = [];

  await productsPage.goto();
});

When('visita el carrito', { timeout: 30000 }, async function () {
  await cartPage.goto();
});

When('agrega {string} al carrito', { timeout: 30000 }, async function (productName: string) {
  await productsPage.goto();
  await productsPage.searchProduct(productName);
  await productsPage.selectProduct(productName);
  const price = await productDetailPage.getUnitPrice();
  addedPrices.push(price);
  await productDetailPage.addToCart();
});

When('elimina {string} del carrito', { timeout: 30000 }, async function (productName: string) {
  await cartPage.removeProduct(productName);
});

Then('el carrito muestra {string} con su precio unitario correcto', { timeout: 30000 }, async function (productName: string) {
  const titleInCart = await cartPage.getProductTitle();
  const priceInCart = await cartPage.getProductPrice();

  expect(titleInCart).toBe(productName);
  expect(priceInCart).toBe(addedPrices[0]);
});

When('aumenta la cantidad a {int}', { timeout: 30000 }, async function (quantity: number) {
  await cartPage.setQuantity(quantity);
});

Then('el subtotal de {string} es el precio unitario multiplicado por {int}', { timeout: 30000 }, async function (productName: string, multiplier: number) {
  const linePrice = await cartPage.getLinePrice();
  const expected = addedPrices[0]! * multiplier;

  expect(linePrice).toBe(expected);
});

Then('el total del carrito es la suma de los precios de ambos productos', { timeout: 30000 }, async function () {
  const cartTotal = await cartPage.getCartTotal();
  const expectedTotal = addedPrices.reduce((sum, price) => sum + price, 0);

  expect(cartTotal).toBe(expectedTotal);
});

Then('el total del carrito es el precio del producto restante', { timeout: 30000 }, async function () {
  const cartTotal = await cartPage.getCartTotal();
  const expectedTotal = addedPrices[0]!;

  expect(cartTotal).toBe(expectedTotal);
});

Then('no debería ver el ícono del carrito en la navegación', { timeout: 30000 }, async function () {
  const navigationPage = new NavigationPage(page);
  const isVisible = await navigationPage.isCartIconVisible();

  expect(isVisible).toBe(false)
});

Then('debería ver el mensaje {string}', { timeout: 30000 }, async function (expectedMessage: string) {
  const actualMessage = await cartPage.getEmptyCartMessage()

  expect(actualMessage).toBe(expectedMessage)
});

Then('no debería poder avanzar al checkout', { timeout: 30000 }, async function () {
  const isVisible = await cartPage.isProceedToCheckoutVisible();

  expect(isVisible).toBe(false)
});