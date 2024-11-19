import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './User.schema';
import { UpdateUserDto, UserDto } from './user.dto';
import { filterUndefinedData } from 'src/util/functions';

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

  async updateUser(data: UpdateUserDto, userId: string) {
    //check if user exists
    const existingUser = await this.userModel.findById({ _id: userId });
    if (!existingUser) {
      return new BadRequestException('user Not found');
    }
    const updateData = filterUndefinedData(data);

    return await this.userModel
      .findOneAndUpdate({ _id: userId }, updateData)
      .exec();
  }

  async getCurrentUser(userId: string) {
    try {
      const user = await this.userModel.findOne({ _id: userId });
      if (!user) {
        throw new BadRequestException('User Not Found');
      }
      return user;
    } catch (e) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async getAnyUser() {
    try {
      const user = await this.userModel.findOne({});
      return user;
    } catch (e) {
      throw new InternalServerErrorException(
        'Failed to get db connection->',
        new Date().toDateString(),
      );
    }
  }
}
