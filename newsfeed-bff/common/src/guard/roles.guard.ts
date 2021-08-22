import { CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Mongoose } from 'mongoose';
import { UserSchema } from '../schema/user.schema';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector, 
    private readonly configService: ConfigService,
    private mongoConn: Mongoose
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const role = this.reflector.get<string>('role', context.getHandler());
    if (role == 'public') {
      return true;
    }

    return true;

    let request = context.switchToHttp().getRequest();
    console.log('[TEST] request: '+request);
    const authHeader = request.headers['authorization'];
    console.log('[TEST] Authorization: '+authHeader);
    if (authHeader) {
      const auth = authHeader.trim().split(' ');
      if (auth?.length > 0) {
        const token = auth[auth.length - 1];
        if (token == null) {
          return false;
        }
        
        const decodedToken = Buffer.from(token, 'base64').toString('utf8');
        const account = decodedToken.split(':');
        console.log('[TEST] decodedToke: '+decodedToken);
        if (account?.length < 2) {
          return false;
        }

        if (role == 'admin') {
          const id = this.configService.get<string>('adminAuth.id');
          const password = this.configService.get<string>('adminAuth.password');
          if (account[0] == id && account[1] == password) {
            return true;
          } else {
            return false;
          }
        } else if (role == 'user') {
          const model = (await this.mongoConn.connect(this.configService.get<string>('mongoUri'))).model('User', UserSchema);
          const user = model.findOne({id: account[0]});

          if (!user) {
            return false;
          }

          if (account[0] == user.id && account[1] == user.password) {
            return true;
          } else {
            return false;
          }
        }
        return true;
      }
      return false;
    }
  }
}
