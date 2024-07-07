import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurant } from 'src/my-restaurant/Restaurant.schema';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant.name) private restaurantModel: Model<Restaurant>,
  ) {}
  async searchRestaurant(city: string, query?: any) {
    const searchQuery = (query.searchQuery as string) || '';
    const selectedCuisines = (query.selectedCuisines as string) || '';
    const sortOption = (query.sortOption as string) || '';
    const page = parseInt(query.page as string) || 1;

    const dbQuery: any = {};

    dbQuery['city'] = new RegExp(city, 'i');
    const cityCount = await this.restaurantModel.countDocuments(dbQuery);
    if (cityCount === 0) {
      return {
        data: [],
        pagination: {
          total: 0,
          page: 1,
          pages: 1,
        },
      };
    }
    if (selectedCuisines?.length) {
      const cuisinesArray = selectedCuisines.split(',').map((cuisine) => {
        return new RegExp(cuisine, 'i');
      });
      dbQuery['cuisines'] = { $all: cuisinesArray };
    }
    if (searchQuery?.length) {
      const searchRegExp = new RegExp(searchQuery, 'i');

      dbQuery['$or'] = [
        {
          name: searchRegExp,
        },
        {
          cuisines: { $in: [searchRegExp] },
        },
      ];
    }

    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const restaurantsQuery = this.restaurantModel.find(dbQuery);

    if (sortOption?.length) {
      restaurantsQuery.sort({ [sortOption]: 1 });
    }

    const restaurants = await restaurantsQuery
      .skip(skip)
      .limit(pageSize)
      .lean();

    const total = await this.restaurantModel.countDocuments(dbQuery);

    return {
      data: restaurants,
      pagination: {
        total: total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    };
  }
}
