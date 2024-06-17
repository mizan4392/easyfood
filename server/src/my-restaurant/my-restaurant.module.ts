import { Module } from '@nestjs/common';
import { MyRestaurantService } from './my-restaurant.service';
import { MyRestaurantController } from './my-restaurant.controller';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { FileUploadModule } from 'src/file-upload/file-upload.module';
import { MulterModule } from '@nestjs/platform-express';
import { storage } from 'src/util/multer';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MenuItem,
  MenuItemSchema,
  Restaurant,
  RestaurantSchema,
} from './Restaurant.schema';
import { User, UserSchema } from 'src/user/User.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Restaurant.name,
        schema: RestaurantSchema,
      },
      {
        name: MenuItem.name,
        schema: MenuItemSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    MulterModule.register({
      dest: './uploads',
      storage: storage,
    }),

    FileUploadModule,
  ],
  controllers: [MyRestaurantController],
  providers: [MyRestaurantService, FileUploadService],
})
export class MyRestaurantModule {}
