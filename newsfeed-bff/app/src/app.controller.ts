import { Controller, SetMetadata, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @SetMetadata('role', 'public')
  @Get('ping')
  getHello(): string {
    return 'pong';
  }
}
