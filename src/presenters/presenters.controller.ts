import { Controller, Get } from '@nestjs/common';
    import { PresentersService } from './presenters.service';

    @Controller('presenters')
    export class PresentersController {
      constructor(private readonly presentersService: PresentersService) {}

      @Get()
      findAll() {
        return this.presentersService.findAll();
      }
    }
