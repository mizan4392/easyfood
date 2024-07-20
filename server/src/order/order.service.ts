import { MenuItemType } from './../my-restaurant/Restaurant.schema';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Restaurant } from 'src/my-restaurant/Restaurant.schema';

import { StripeService } from './stripe.service';
import { InjectModel } from '@nestjs/mongoose';
import Stripe from 'stripe';
import { Order, OrderStatusType } from './order.schema';

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
    @InjectModel(Order.name) private orderModel: Model<Order>,
  ) {}
  async createCheckoutSession(data: CheckoutSessionRequest, userId: string) {
    // Get the restaurant
    const restaurant = await this.restaurantModel.findById(data.restaurantId);

    //throw error if restaurant is not found
    if (!restaurant) {
      throw new Error('Restaurant not found');
    }

    // Create order in mongoDB
    const orderData = {
      restaurant: data.restaurantId,
      user: userId,
      status: 'place',
      deliveryDetails: data.deliveryDetails,
      cartItem: data.cartItems,
      createdAt: new Date().toISOString(),
    };

    const newOrder = new this.orderModel(orderData);

    const lineItems = createLineItems(data, restaurant.menuItems);

    const session = await this.stripeService.createCheckoutSession(
      lineItems,
      newOrder._id.toString(),
      restaurant.deliveryPrice,
      data.restaurantId,
    );
    if (!session?.url) {
      throw new Error('Failed to create session');
    }
    newOrder.save();
    return { url: session.url };
  }

  async updateOrderStatus(
    orderId: string,
    status: OrderStatusType,
    totalAmount: number,
  ) {
    const order = await this.orderModel.findById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    order.totalAmount = totalAmount;
    order.status = status;

    return await order.save();
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
