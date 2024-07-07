import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get('search/:city')
  async searchRestaurant(@Param('city') city: string, @Query() query: string) {
    console.log(city, query);
    if (!city?.length) {
      throw new BadRequestException('City is required');
    }

    return this.restaurantService.searchRestaurant(city, query);
  }
}
