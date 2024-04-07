/* eslint-disable @typescript-eslint/no-var-requires */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { User } from 'src/user/User.schema';

const jwt = require('jsonwebtoken');

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private AUTH0_AUDIENCE: string;
  private AUTH0_DOMAIN: string;

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.getArgByIndex(0);

    try {
      const authorization = request.headers.authorization;
      if (authorization) {
        const token = authorization.split(' ')[1];
        const decode = jwt.decode(token);
        const auth0Id = decode.sub;

        const user = await this.userModel.findOne({ auth0Id });
        if (!user) {
          throw new UnauthorizedException('Requires authentication');
        }
        const userId = user._id.toString();
        request.user = { auth0Id, userId };
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException('Requires authentication');
    }
  }
}
