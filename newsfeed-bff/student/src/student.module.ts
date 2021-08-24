import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { REQUEST } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsSchema, UserSchema } from '@newsfeed/common';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
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
    HttpModule,
    ConfigModule,
  ],
  controllers: [
    StudentController
  ],
  providers: [
    StudentService
  ],
})

export class StudentModule {
}
