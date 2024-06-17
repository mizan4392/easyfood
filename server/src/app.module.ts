// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

import { FileUploadModule } from './file-upload/file-upload.module';
import { MyRestaurantModule } from './my-restaurant/my-restaurant.module';
import { MulterModule } from '@nestjs/platform-express';
import { storage } from './util/multer';
import { AuthModule } from './authorization/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MulterModule.register({
      dest: './uploads',
      storage: storage,
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URI),
    AuthModule,
    UserModule,
    FileUploadModule,
    MyRestaurantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
