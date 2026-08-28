import { APIRequestContext } from '@playwright/test';

export class InvoicesClient {
  constructor(private request: APIRequestContext) {}

  async createInvoice(body: object, token?: string) {
    const headers = token !== undefined ? { Authorization: `Bearer ${token}` } : {};
    
    return await this.request.post('http://localhost:8091/invoices', {
      data: body,
      headers,
    });
  }
}