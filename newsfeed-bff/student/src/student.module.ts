import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
// import { RaideaApiModule } from '@carplat/raidea-api';
import { REQUEST } from '@nestjs/core';

@Module({
  imports: [
    HttpModule
  ],
  controllers: [
    StudentController
  ],
  providers: [
    StudentService
  ]
})

export class StudentModule {
}
