import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { Auth0AuthorizationGuard } from 'src/authorization/auth0-authorization.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @UseGuards(Auth0AuthorizationGuard)
  createUser(@Body() body: UserDto) {
    return this.userService.createUser(body);
  }

  @Get('fetch')
  fetchUsers() {
    return 'unprotected route';
  }
}
