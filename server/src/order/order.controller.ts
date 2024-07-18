import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CheckoutSessionRequest, OrderService } from './order.service';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('checkout/create-checkout-session')
  @UseGuards(AuthorizationGuard)
  async createCheckoutSession(@Body() data: CheckoutSessionRequest) {
    return this.orderService.createCheckoutSession(data);
  }
}
