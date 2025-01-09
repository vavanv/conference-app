import { Injectable } from '@nestjs/common';

    @Injectable()
    export class OrganizationsService {
      private organizations = [
        { id: 1, name: 'Org A', address: '123 Main St' },
        { id: 2, name: 'Org B', address: '456 Elm St' },
        { id: 3, name: 'Org C', address: '789 Oak St' }
      ];

      findAll() {
        return this.organizations;
      }
    }
