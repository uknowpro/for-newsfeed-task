import { Controller, SetMetadata, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @SetMetadata('roles', ['public'])
  @Get('ping')
  getHello(): string {
    return 'pong';
  }
}
