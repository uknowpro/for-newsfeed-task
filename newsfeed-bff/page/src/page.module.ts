import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PageController } from './page.controller';
import { PageService } from './page.service';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
// import { RaideaApiModule } from '@carplat/raidea-api';
import { REQUEST } from '@nestjs/core';

@Module({
  imports: [
    HttpModule
  ],
  controllers: [
    PageController,
    NewsController
  ],
  providers: [
    PageService,
    NewsService
  ]
})
export class PageModule {
}
