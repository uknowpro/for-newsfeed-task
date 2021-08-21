import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PageModule } from '@school/page';
import { StudentModule } from '@school/student';

@Module({
  imports: [
    PageModule,
    StudentModule
  ],
  controllers: [AppController]
})
export class AppModule {}
