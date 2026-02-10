import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as firebaseAdmin from 'firebase-admin';
import * as fs from 'fs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Admin } from 'typeorm';
import { Get } from '@nestjs/common';
import { getMessaging } from 'firebase-admin/messaging';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('firebase')
    .setDescription(
      'firebase implementation for authentication and notification',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
        name: 'authorization',
      },
      'firebase-auth',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const firebasefilepath = 'src/auth/firebasekey.json';
  const FireBaseServiceAccount = JSON.parse(
    fs.readFileSync(firebasefilepath).toString(),
  );
  if (firebaseAdmin.apps.length === 0) {
    console.log('initialize firebase application');
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(FireBaseServiceAccount),
    });
  }
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
