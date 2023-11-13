import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { USER_MODEL } from './users.provider';
import { hash } from '../../utils/hash';

@Injectable()
export class UsersService {
  constructor(@Inject(USER_MODEL) private userModel: Model<User>) {}

  async create(data: CreateUserDto) {
    data.password = await hash(data.password);
    const user = new this.userModel(data);
    return user.save();
  }

  async checkUser(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(_id: string) {
    return this.userModel
      .findOne(
        { _id },
        {
          password: 0,
        },
      )
      .exec();
  }
}
