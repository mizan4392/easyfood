import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './User.schema';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async createUser(data: UserDto) {
    const { auth0Id } = data;
    //check if user exists
    const existingUser = await this.userModel.findOne({ auth0Id });

    if (existingUser) {
      return 'user already exists';
    }
    //if not create user
    const newUser = await this.userModel.create(data);
    //return user
    return newUser;
  }
}
