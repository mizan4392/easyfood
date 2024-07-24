import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from './Restaurant.schema';
import { Model } from 'mongoose';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { Order } from 'src/order/order.schema';

@Injectable()
export class MyRestaurantService {
  constructor(
    @InjectModel(Restaurant.name) private restaurantModel: Model<Restaurant>,
    @InjectModel(Order.name) private orderSchemaModel: Model<Order>,
    private readonly fileUploadService: FileUploadService,
  ) {}
  async createMyRestaurant(data, userId, filepath: string) {
    const existingRestaurant = await this.restaurantModel.findOne({
      user: userId,
    });

    if (existingRestaurant) {
      throw new HttpException(
        'User restaurant already exists',
        HttpStatus.CONFLICT,
      );
    }
    const fileUploadResult = await this.fileUploadService.uploadImage(filepath);

    const restaurant = new this.restaurantModel(data);
    restaurant.user = userId;
    restaurant.imgUrl = fileUploadResult.url;
    restaurant.lastUpdated = new Date().toString();
    return restaurant.save();
  }

  async getMyRestaurant(userId) {
    return this.restaurantModel.findOne({ user: userId });
  }
  async updateMyRestaurant(data, userId, filepath: string) {
    const existingRestaurant = await this.restaurantModel.findOne({
      user: userId,
    });
    if (!existingRestaurant) {
      throw new HttpException('Restaurant not found', HttpStatus.NOT_FOUND);
    }

    existingRestaurant.name = data.name;
    existingRestaurant.city = data.city;
    existingRestaurant.country = data.country;
    existingRestaurant.deliveryPrice = data.deliveryPrice;
    existingRestaurant.estimatedDeliveryTime = data.estimatedDeliveryTime;
    existingRestaurant.cuisines = data.cuisines;
    existingRestaurant.menuItems = data.menuItems;
    existingRestaurant.lastUpdated = new Date().toString();

    if (filepath) {
      const fileUploadResult =
        await this.fileUploadService.uploadImage(filepath);
      existingRestaurant.imgUrl = fileUploadResult.url;
    }

    const updatedRestaurant = await this.restaurantModel.findOneAndUpdate(
      { user: userId },
      {
        ...existingRestaurant,
      },
    );
    return updatedRestaurant;
  }

  async getMyRestaurantOrders(userId) {
    const existingRestaurant = await this.restaurantModel.findOne({
      user: userId,
    });
    if (!existingRestaurant) {
      throw new HttpException('Restaurant not found', HttpStatus.NOT_FOUND);
    }
    return this.orderSchemaModel
      .find({ restaurant: existingRestaurant._id })
      .populate('user')
      .populate('restaurant');
  }

  async updateOrderStatus(orderId, status, userId) {
    const existingRestaurant = await this.restaurantModel.findOne({
      user: userId,
    });
    if (!existingRestaurant) {
      throw new HttpException('Restaurant not found', HttpStatus.NOT_FOUND);
    }
    const order = await this.orderSchemaModel.findOne({
      _id: orderId,
      restaurant: existingRestaurant._id,
    });
    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    order.status = status;
    return order.save();
  }
}
