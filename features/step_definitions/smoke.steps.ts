import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('tengo el framework configurado', function () {
  console.log('Framework configurado ✅');
});

When('ejecuto un paso de prueba', function () {
  console.log('Ejecutando paso de prueba...');
});

Then('debería ver que todo funciona', function () {
  expect(true).toBe(true);
});