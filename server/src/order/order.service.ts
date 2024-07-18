import { MenuItemType } from './../my-restaurant/Restaurant.schema';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Restaurant } from 'src/my-restaurant/Restaurant.schema';

import { StripeService } from './stripe.service';
import { InjectModel } from '@nestjs/mongoose';
import Stripe from 'stripe';

export type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: number;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
};
@Injectable()
export class OrderService {
  constructor(
    private readonly stripeService: StripeService,
    @InjectModel(Restaurant.name) private restaurantModel: Model<Restaurant>,
  ) {}
  async createCheckoutSession(data: CheckoutSessionRequest) {
    // Get the restaurant
    const restaurant = await this.restaurantModel.findById(data.restaurantId);

    //throw error if restaurant is not found
    if (!restaurant) {
      throw new Error('Restaurant not found');
    }

    const lineItems = createLineItems(data, restaurant.menuItems);

    const session = await this.stripeService.createCheckoutSession(
      lineItems,
      'TEST_ORDER_ID',
      restaurant.deliveryPrice,
      data.restaurantId,
    );
    if (!session?.url) {
      throw new Error('Failed to create session');
    }

    return { url: session.url };
  }
}

const createLineItems = (
  sessionData: CheckoutSessionRequest,
  menuItems: MenuItemType[],
) => {
  //1.foreach cart item, find the corresponding menu item for price
  const lineItems = sessionData.cartItems.map((cartItem) => {
    const menuItem = menuItems.find(
      (item) => item._id.toString() === cartItem.menuItemId.toString(),
    );
    if (!menuItem) {
      throw new Error('Menu item not found');
    }

    const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
      price_data: {
        currency: 'gbp',
        unit_amount: menuItem.price,
        product_data: {
          name: menuItem.name,
        },
      },
      quantity: cartItem.quantity,
    };
    return lineItem;
  });

  //2.return the array of stripe line items
  return lineItems;
};
