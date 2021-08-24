import { CanActivate, ExecutionContext, Injectable, ForbiddenException, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
// import { Mongoose } from 'mongoose';
import { UserSchema } from '../schema/user.schema';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector, 
    private readonly configService: ConfigService,
    // private mongoConn: Mongoose
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get('roles', context.getHandler());
    if (roles.find(role => role === 'public')) {
      return true;
    }
    let request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new BadRequestException('Must need token.');
    }
    const auth = authHeader.trim().split(' ');
    if (auth?.length < 2) {
      throw new BadRequestException('Invalid authorization.');
    }
    const token = auth[auth.length-1];
    if (!token) {
      throw new BadRequestException('Invalid authorization.');
    }
    const decodedToken = Buffer.from(token, 'base64').toString('utf8');
    const accountInfo = decodedToken.split(':');
    if (accountInfo?.length < 2) {
      throw new BadRequestException('Unknown account info in your token.');
    }
    if (roles.find(
      async (role) => {
        if (role === 'admin') {
          const adminId = this.configService.get<string>('adminAuth.id');
          if (accountInfo[0] == adminId) {
            return true;
          }
        } else if (role === 'user') {
          const mongoose = require('mongoose');
          const conn = await mongoose.createConnection(this.configService.get<string>('mongoUri'), {useNewUrlParser: true, useUnifiedTopology: true});
          const userModel = conn.model('User', UserSchema);
          const user = userModel.findOne({id: accountInfo[0], password: accountInfo[1]});
          if (user) {
            request.headers['User-Id'] = accountInfo[0];
            return true;
          }
        }
        return false;
      }
    )) {
      return true;
    }
    throw new ForbiddenException('Invalid account in your token.');
  }
}
