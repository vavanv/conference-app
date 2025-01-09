import { Injectable } from '@nestjs/common';

    @Injectable()
    export class EventsService {
      private events = [
        { id: 1, name: 'Event A', date: '2023-12-01' },
        { id: 2, name: 'Event B', date: '2023-12-15' },
        { id: 3, name: 'Event C', date: '2024-01-01' }
      ];

      findAll() {
        return this.events;
      }
    }
