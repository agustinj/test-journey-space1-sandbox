import { APIRequestContext } from '@playwright/test';

export class AuthClient {
  constructor(private request: APIRequestContext) {}

  async login(email: string, password: string) {
    return await this.request.post('http://localhost:8091/users/login', {
      data: { email, password },
    });
  }
}