import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CheckoutSessionRequest, OrderService } from './order.service';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';
import { CurrentUser } from 'src/decorators/user.decorator';

import { AuthUser } from 'src/user/user.dto';
import Stripe from 'stripe';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('my-orders')
  @UseGuards(AuthorizationGuard)
  async getMyOrders(@CurrentUser() user: AuthUser) {
    return this.orderService.getMyOrders(user.userId);
  }

  @Post('checkout/create-checkout-session')
  @UseGuards(AuthorizationGuard)
  async createCheckoutSession(
    @Body() data: CheckoutSessionRequest,
    @CurrentUser() user: AuthUser,
  ) {
    return this.orderService.createCheckoutSession(data, user.userId);
  }

  @Post('checkout/webhook')
  async stripeWebhook(@Body() data: any, @Request() req: any) {
    let event;

    try {
      const sig = req.headers['stripe-signature'];

      event = Stripe.webhooks.constructEvent(
        req.rawBody,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      console.log('STRIPE Error::', err);
      throw new BadRequestException(`Webhook Error: ${err.message}`);
    }
    if (event.type === 'checkout.session.completed') {
      return this.orderService.updateOrderStatus(
        event.data.object.metadata.orderId,
        'paid',
        event.data.object.amount_total,
      );
    }
  }
}
