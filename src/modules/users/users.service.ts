import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from '../../utils/hash';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

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
