import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { user } from './user.entity';
//import { AuthGuard } from '@nestjs/passport';
import { registeruserdto } from './registeruser.dto';
import { AuthGuard } from './auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /*@Get('register')
  async registeruser(@Body() dto: user) {
    return await this.appService.registeruser(dto);
  }
    */

  @UseGuards(AuthGuard)
  @ApiBearerAuth('firebase-auth')
  @Post('getuser')
  async getuser() {
    return await this.appService.showalluser();
  }
  @Post('register')
  async registeruser(@Body() dto: registeruserdto) {
    return await this.appService.registeruser(dto);
  }
}
