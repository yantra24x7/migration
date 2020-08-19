import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  setToken(token: any) {
      throw new Error("Method not implemented.");
  }

  private token: string | null = null;
  private tenant_id: string | null = null;

  constructor() { 
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      this.token = savedToken;
    }

    const tenant = localStorage.getItem('tenant_id');
    if (tenant) {
      this.tenant_id = tenant;
    }
  }

  getEncodedToken(): string | null {
    return this.token;
  }
  getTenantID(): string | null {
    return this.tenant_id;
  }


}

