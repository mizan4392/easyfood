import { AuthorizationGuard } from './../authorization/authorization.guard';
import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthUser, UpdateUserDto, UserDto } from './user.dto';
import { Auth0AuthorizationGuard } from 'src/authorization/auth0-authorization.guard';
import { CurrentUser } from 'src/decorators/user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @UseGuards(Auth0AuthorizationGuard)
  createUser(@Body() body: UserDto) {
    return this.userService.createUser(body);
  }

  @Patch('update')
  @UseGuards(AuthorizationGuard)
  updateUser(@CurrentUser() user: AuthUser, @Body() body: UpdateUserDto) {
    return this.userService.updateUser(body, user.userId);
  }

  @Get('current-user')
  @UseGuards(AuthorizationGuard)
  getCurrentUser(@CurrentUser() user: AuthUser) {
    return this.userService.getCurrentUser(user.userId);
  }
}
