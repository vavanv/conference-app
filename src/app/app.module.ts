import { Module } from '@nestjs/common';
    import { AppController } from './app.controller';
    import { AppService } from './app.service';
    import { OrganizationsModule } from '../organizations/organizations.module';
    import { LocationsModule } from '../locations/locations.module';
    import { EventsModule } from '../events/events.module';
    import { PresentersModule } from '../presenters/presenters.module';
    import { AttendanceModule } from '../attendance/attendance.module';
    import { AuthModule } from '../auth/auth.module';

    @Module({
      imports: [
        OrganizationsModule,
        LocationsModule,
        EventsModule,
        PresentersModule,
        AttendanceModule,
        AuthModule
      ],
      controllers: [AppController],
      providers: [AppService],
    })
    export class AppModule {}
