/* eslint-disable @typescript-eslint/no-var-requires */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { expressJwtSecret } from 'jwks-rsa';
import { promisify } from 'util';

const { expressjwt: jwt } = require('express-jwt');

@Injectable()
export class Auth0AuthorizationGuard implements CanActivate {
  private AUTH0_AUDIENCE: string;
  private AUTH0_DOMAIN: string;

  constructor(private configService: ConfigService) {
    this.AUTH0_AUDIENCE = this.configService.get('AUDIENCE');
    this.AUTH0_DOMAIN = this.configService.get('ISSUER_BASE_URL');
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.getArgByIndex(0);
    const response = context.getArgByIndex(1);

    const checkJwt = promisify(
      jwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `${this.AUTH0_DOMAIN}.well-known/jwks.json`,
        }),
        audience: this.AUTH0_AUDIENCE,
        issuer: this.AUTH0_DOMAIN,
        algorithms: ['RS256'],
      }),
    );

    try {
      await checkJwt(request, response);

      return true;
    } catch (error) {
      throw new UnauthorizedException('Requires authentication');
    }
  }
}
