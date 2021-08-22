import { Module } from '@nestjs/common';
import { mongoProviders } from './mongo.provider';
import { MongoService } from './mongo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PageSchema, NewsSchema, UserSchema } from '@newsfeed/common';
import { DatabaseModule } from './database.module';

@Module({
  imports: [
    // MongooseModule.forFeature([
    //   { name: 'Page', schema: PageSchema },
    //   { name: 'News', schema: NewsSchema },
    //   { name: 'User', schema: UserSchema }
    // ]),
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
        name: 'News',
        useFactory: () => {
          const schema = NewsSchema;
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
    // DatabaseModule
  ],
  controllers: [
  ],
  providers: [
    MongoService,
    // ...mongoProviders,
  ],
  exports: [
    MongoService,
    // ...mongoProviders
  ]
})
export class MongoModule {
}
