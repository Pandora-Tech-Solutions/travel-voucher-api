import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { urlencoded } from 'body-parser';
import type { Request, Response } from 'express';

import { AppModule } from '../src/app.module';

// Reaproveita a instância do Nest entre invocações "quentes" da função
// serverless, evitando recriar a app (e reconectar no Mongo) a cada request.
let cachedServer: (req: Request, res: Response) => void;

async function bootstrap(): Promise<(req: Request, res: Response) => void> {
  if (!cachedServer) {
    const app = await NestFactory.create(AppModule, { cors: true });

    app.useGlobalPipes(new ValidationPipe());
    app.enableCors();
    app.setGlobalPrefix('api/v1');
    app.use(urlencoded({ extended: true }));

    const config = new DocumentBuilder()
      .setTitle('Laike Turismo - Vale Viajem API')
      .setDescription('API for sign terms and contracts')
      .setVersion('0.1')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);

    await app.init();

    cachedServer = app.getHttpAdapter().getInstance();
  }

  return cachedServer;
}

export default async function handler(req: Request, res: Response) {
  const server = await bootstrap();
  server(req, res);
}
