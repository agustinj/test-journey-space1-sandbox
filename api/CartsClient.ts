import { APIRequestContext } from '@playwright/test';

export class CartsClient {
  constructor(private request: APIRequestContext) {}

  async createCart() {
    return await this.request.post('http://localhost:8091/carts');
  }
}