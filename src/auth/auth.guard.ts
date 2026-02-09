import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { authservice } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authservice: authservice) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return await this.authservice.validaterequest(request);
  }
}
