// /* eslint-disable @typescript-eslint/no-var-requires */
// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';

// import { expressJwtSecret } from 'jwks-rsa';

// import { promisify } from 'util';

// const { expressjwt: jwta } = require('express-jwt');

// @Injectable()
// export class Auth0AuthorizationGuard implements CanActivate {
//   private AUTH0_AUDIENCE: string;
//   private AUTH0_DOMAIN: string;

//   constructor(private configService: ConfigService) {
// this.AUTH0_AUDIENCE = this.configService.get('AUDIENCE');
// this.AUTH0_DOMAIN = this.configService.get('ISSUER_BASE_URL');
//   }
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.getArgByIndex(0);
//     const response = context.getArgByIndex(1);
//     console.log(
//       'AUTH0 DOMAIN AND AUDIENCE:',
//       this.AUTH0_DOMAIN,
//       this.AUTH0_AUDIENCE,
//     );
//     const checkJwt = promisify(
//       jwta({
//         secret: expressJwtSecret({
//           cache: true,
//           rateLimit: true,
//           jwksRequestsPerMinute: 5,
//           jwksUri: `${this.AUTH0_DOMAIN}.well-known/jwks.json`,
//         }),
//         audience: this.AUTH0_AUDIENCE,
//         issuer: this.AUTH0_DOMAIN,
//         algorithms: ['RS256'],
//       }),
//     );

//     try {
//       await checkJwt(request, response);

//       return true;
//     } catch (error) {
//       console.log('Auth0 Authorization Guard Error:', error);
//       throw new UnauthorizedException('Requires authentication');
//     }
//   }
// }

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { auth } from 'express-oauth2-jwt-bearer';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class Auth0AuthorizationGuard implements CanActivate {
  private jwtCheck;

  constructor(private configService: ConfigService) {
    const AUTH0_AUDIENCE = this.configService.get('AUDIENCE');
    const AUTH0_DOMAIN = this.configService.get('ISSUER_BASE_URL');
    this.jwtCheck = auth({
      audience: AUTH0_AUDIENCE,
      issuerBaseURL: AUTH0_DOMAIN,
      tokenSigningAlg: 'RS256',
    });
  }

  canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    return new Promise((resolve, reject) => {
      this.jwtCheck(req, {}, (err) => {
        console.log('JWT Auth Guard Error:', err);
        if (err) {
          reject(new UnauthorizedException(err.message));
        } else {
          console.log('JWT Auth Guard: Authentication successful');
          resolve(true);
        }
      });
    });
  }
}
