import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// swagger 세팅
export const setupSwagger = (app: INestApplication): void => {
  const options = new DocumentBuilder()
    .setTitle('RB API Docs')
    .setDescription('RB API')
    .setVersion('1.0.0')
    // 커스텀 jwt 토큰 설정
    .addApiKey(
      {
        type: 'apiKey',
        name: 'rb-token',
        description: 'Enter JWT token',
        in: 'header',
      },
      'rb-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/docs', app, document);
};
