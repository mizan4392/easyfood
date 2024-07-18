import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/User.schema';
import {
  Restaurant,
  RestaurantSchema,
} from 'src/my-restaurant/Restaurant.schema';
import { StripeService } from './stripe.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Restaurant.name,
        schema: RestaurantSchema,
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, StripeService],
})
export class OrderModule {}
