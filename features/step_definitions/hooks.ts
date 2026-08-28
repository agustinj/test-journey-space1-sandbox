import { Before, After, Status } from '@cucumber/cucumber';
import { chromium, Browser, Page, request, APIRequestContext, APIResponse } from '@playwright/test';

export let browser: Browser;
export let page: Page;
export let apiContext: APIRequestContext;
export let apiResponse: APIResponse;

export function setApiResponse(res: APIResponse) {
  apiResponse = res;
}

Before({ timeout: 30000 }, async function () {
  browser = await chromium.launch({ headless: true });
  page = await browser.newPage();
  apiContext = await request.newContext();
});

After(async function (testCase) {
  if (testCase.result?.status === Status.FAILED && page) {
    await page.screenshot({ path: 'test-results/failure.png' });
  }
  if (browser) {
    await browser.close();
  }
});