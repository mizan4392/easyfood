import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MyRestaurantService } from './my-restaurant.service';
import { AuthUser } from 'src/user/user.dto';
import { CurrentUser } from 'src/decorators/user.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';
import { MyRestaurantDto } from './my-restaurant.dto';

@Controller('my-restaurant')
export class MyRestaurantController {
  constructor(private readonly myRestaurantService: MyRestaurantService) {}

  @Post()
  @UseGuards(AuthorizationGuard)
  @UseInterceptors(FilesInterceptor('images'))
  createMyRestaurant(
    @Body() body: MyRestaurantDto,
    @CurrentUser() user: AuthUser,
    @UploadedFiles() files: any,
  ) {
    const filepaths = files.map((file) => file.path);
    console.log(filepaths);
    console.log(user);
    return this.myRestaurantService.createMyRestaurant(
      body,
      user.userId,
      filepaths,
    );
  }
}
