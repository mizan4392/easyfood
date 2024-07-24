import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MyRestaurantService } from './my-restaurant.service';
import { AuthUser } from 'src/user/user.dto';
import { CurrentUser } from 'src/decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';
import { MyRestaurantDto } from './my-restaurant.dto';
@Controller('my-restaurant')
export class MyRestaurantController {
  constructor(private readonly myRestaurantService: MyRestaurantService) {}

  @Post()
  @UseGuards(AuthorizationGuard)
  @UseInterceptors(FileInterceptor('image'))
  createMyRestaurant(
    @Body() body: MyRestaurantDto,
    @CurrentUser() user: AuthUser,
    @UploadedFile() file: any,
  ) {
    return this.myRestaurantService.createMyRestaurant(
      body,
      user.userId,
      file?.path,
    );
  }

  @Get()
  @UseGuards(AuthorizationGuard)
  getMyRestaurant(@CurrentUser() user: AuthUser) {
    return this.myRestaurantService.getMyRestaurant(user.userId);
  }

  @Patch()
  @UseGuards(AuthorizationGuard)
  @UseInterceptors(FileInterceptor('image'))
  updateMyRestaurant(
    @Body() body: MyRestaurantDto,
    @CurrentUser() user: AuthUser,
    @UploadedFile() file: any,
  ) {
    return this.myRestaurantService.updateMyRestaurant(
      body,
      user.userId,
      file?.path,
    );
  }

  @Patch('/order/:orderId/status')
  @UseGuards(AuthorizationGuard)
  updateOrderStatus(
    @Body('status') status: string,
    @CurrentUser() user: AuthUser,
    @Param('orderId') orderId: string,
  ) {
    return this.myRestaurantService.updateOrderStatus(
      orderId,
      status,
      user.userId,
    );
  }

  @Get('orders')
  @UseGuards(AuthorizationGuard)
  getMyRestaurantOrders(@CurrentUser() user: AuthUser) {
    return this.myRestaurantService.getMyRestaurantOrders(user.userId);
  }
}
