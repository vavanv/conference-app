import { Injectable } from '@nestjs/common';

    @Injectable()
    export class LocationsService {
      private locations = [
        { id: 1, name: 'Location A', capacity: 100 },
        { id: 2, name: 'Location B', capacity: 200 },
        { id: 3, name: 'Location C', capacity: 300 }
      ];

      findAll() {
        return this.locations;
      }
    }
