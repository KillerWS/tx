import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(':id')  // GET /users/:id
  getTest(): string {
    return 'This action returns all users';
  }
}
