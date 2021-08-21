import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');

  const config = new DocumentBuilder()
    .setTitle('Newsfeed BFF APIs')
    .setDescription(`
      뉴스피드 서비스 제공을 위한 백엔드 API들입니다.

      * 학교 관리자 계정은 서비스가 제공되는 시점에 미리 생성되어 있습니다. 백엔드 서비스 담당자에게 문의해주세요.
      * {token} 은 admin:admin1234 와 같은 문자열을 base64 encoding한 문자열을 사용합니다.
    `)
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document);

  await app.listen(3000);
}
bootstrap();
