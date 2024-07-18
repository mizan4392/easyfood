import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  private FRONTEND_URL: string;
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    this.FRONTEND_URL = process.env.FRONTEND_URL;
  }
  async createCheckoutSession(
    lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
    orderId: string,
    deliveryPrice: number,
    restaurantId: string,
  ) {
    console.log(this.FRONTEND_URL);
    // Logic to create a checkout session
    const session = await this.stripe.checkout.sessions.create({
      line_items: lineItems,
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: 'Delivery',
            type: 'fixed_amount',
            fixed_amount: {
              amount: deliveryPrice,
              currency: 'gbp',
            },
          },
        },
      ],
      mode: 'payment',
      metadata: {
        orderId,
        restaurantId,
      },
      success_url: `${this.FRONTEND_URL}/order-status?success=true`,
      cancel_url: `${this.FRONTEND_URL}/detail/${restaurantId}?canceled=true`,
    });
    console.log(session);
    return session;
  }
}
