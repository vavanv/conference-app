import { Injectable } from '@nestjs/common';

    @Injectable()
    export class AuthService {
      login(credentials: any) {
        // Mock authentication
        return { 
          access_token: 'mock-jwt-token',
          user: { id: 1, username: 'testuser' }
        };
      }
    }
