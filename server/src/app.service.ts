import { Injectable } from '@nestjs/common';
import { UserService } from './user/user.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AppService {
  constructor(private readonly userService: UserService) {}
  getHello(): string {
    return 'Hello World!';
  }

  @Cron('0 0 */18 * * *')
  async keepDbLive() {
    await this.userService.getAnyUser();
    console.log(' Database hit on ->', new Date().toDateString());
  }
}
