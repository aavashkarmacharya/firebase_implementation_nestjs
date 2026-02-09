import { Module } from '@nestjs/common';
import { authservice } from './auth.service';
import { authcontroller } from './auth.controller';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [],
  controllers: [authcontroller],
  providers: [authservice, AuthGuard],
  exports: [authservice],
})
export class authmodule {}
