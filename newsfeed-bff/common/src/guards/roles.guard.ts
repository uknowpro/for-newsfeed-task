import { CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const role = this.reflector.get<string>('role', context.getHandler());
    if (role == 'public') {
      return true;
    }

    let request = context.switchToHttp().getRequest();
    const authHeader = request.headers['Authorization'];
    if (authHeader) {
      const auth = authHeader.trim().split(' ');
      if (auth?.length > 0) {
        const token = auth[auth.length - 1];
        if (token == null) {
          return false;
        }
        
        const decodedToken = Buffer.from(token, 'base64').toString('utf8');
        const account = decodedToken.split(':');

        return true;
      }
      return false;
    }
  }
}
