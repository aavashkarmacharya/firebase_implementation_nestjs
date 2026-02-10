import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

import { login, logindata } from './auth.dto';
import { authservice } from './auth.service';

@ApiTags('User Auth') // shows group name in Swagger
@Controller('user')
export class authcontroller {
  constructor(private readonly authservice: authservice) {}

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: logindata })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() dto: login) {
    return await this.authservice.login(dto);
  }
}
