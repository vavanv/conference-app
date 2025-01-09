import { Injectable } from '@nestjs/common';

    @Injectable()
    export class AttendanceService {
      private attendance = [
        { id: 1, eventId: 1, userId: 1, status: 'present' },
        { id: 2, eventId: 1, userId: 2, status: 'absent' },
        { id: 3, eventId: 2, userId: 3, status: 'pending' }
      ];

      findAll() {
        return this.attendance;
      }
    }
