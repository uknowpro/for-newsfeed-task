import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PageController } from './page.controller';
import { PageService } from './page.service';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { REQUEST } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { PageSchema, NewsSchema, UserSchema } from '@newsfeed/common';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'Page',
        useFactory: () => {
          const schema = PageSchema;
          // schema.pre('save', function() { console.log('Hello from pre save') });
          return schema;
        },
      },
      {
        name: 'User',
        useFactory: () => {
          const schema = UserSchema;
          // schema.pre('save', function() { console.log('Hello from pre save') });
          return schema;
        },
      },
    ]),
    HttpModule.registerAsync({
      useFactory: async (config: ConfigService, request: Request) => {
        const useFactory: any = {
          headers: {'Authorization': request.headers['authorization']}
        }
        return useFactory;
      },
      inject: [REQUEST]
    }),
    ConfigModule,
    // MongoModule
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
