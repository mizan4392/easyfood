import { Global, Module } from '@nestjs/common';
import { AuthorizationGuard } from './authorization.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/User.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [AuthorizationGuard],
  exports: [AuthorizationGuard],
})
export class AuthModule {}
