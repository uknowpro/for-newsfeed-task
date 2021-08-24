import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import configs from '@newsfeed/common';
import { PageModule } from '@newsfeed/page';
import { StudentModule } from '@newsfeed/student';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configs }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongoUri'),
      }),
      inject: [ConfigService],
    }),
    PageModule,
    StudentModule
  ],
  controllers: [AppController]
})

export class AppModule {}
