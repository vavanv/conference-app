import { Injectable } from '@nestjs/common';

    @Injectable()
    export class PresentersService {
      private presenters = [
        { id: 1, name: 'Presenter A', expertise: 'Topic A' },
        { id: 2, name: 'Presenter B', expertise: 'Topic B' },
        { id: 3, name: 'Presenter C', expertise: 'Topic C' }
      ];

      findAll() {
        return this.presenters;
      }
    }
