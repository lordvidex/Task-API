import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverConfig: any = config.get('server');
  const PORT = process.env.PORT || serverConfig.port;
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Task API')
    .setDescription('Secure API for saving and retrieving your tasks')
    .addServer(`http://localhost:${PORT}`)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  console.log(`Node environment is ${process.env.NODE_ENV}`);
  console.log(`Granting access from ${serverConfig.origin}`);
  await app.listen(PORT, () => console.log(`Running on PORT ${PORT}`));
}
bootstrap();
