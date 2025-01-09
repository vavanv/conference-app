import { Module } from '@nestjs/common';
    import { PresentersController } from './presenters.controller';
    import { PresentersService } from './presenters.service';

    @Module({
      controllers: [PresentersController],
      providers: [PresentersService]
    })
    export class PresentersModule {}
