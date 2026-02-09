import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { user } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configDotenv } from 'dotenv';
import { authmodule } from './auth/auth.module';
import { authcontroller } from './auth/auth.controller';
import { authservice } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
configDotenv();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [user],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([user]),
    authmodule,
  ],
  controllers: [AppController, authcontroller],
  providers: [AppService, authservice, AuthGuard],
})
export class AppModule {}
