import { Module } from '@nestjs/common';
import { authservice } from './auth.service';
import { authcontroller } from './auth.controller';
import { AppService } from 'src/app.service';

@Module({
  imports: [],
  controllers: [authcontroller],
  providers: [authservice],
  exports: [authservice],
})
export class authmodule {}
