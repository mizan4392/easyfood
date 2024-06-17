import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from './Restaurant.schema';
import { Model } from 'mongoose';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Injectable()
export class MyRestaurantService {
  constructor(
    @InjectModel(Restaurant.name) private restaurantModel: Model<Restaurant>,
    private readonly fileUploadService: FileUploadService,
  ) {}
  async createMyRestaurant(data, userId, filepaths: string[]) {
    const existingRestaurant = await this.restaurantModel.findOne({
      user: userId,
    });

    if (existingRestaurant) {
      throw new HttpException(
        'User restaurant already exists',
        HttpStatus.CONFLICT,
      );
    }
    const fileUploadResult =
      await this.fileUploadService.uploadImages(filepaths);

    const restaurant = new this.restaurantModel(data);
    restaurant.user = userId;
    restaurant.imgUrl = fileUploadResult.map((result) => result.url);
    restaurant.lastUpdated = new Date().toString();
    await restaurant.save();
    return 'This action adds a new restaurant';
  }
}
