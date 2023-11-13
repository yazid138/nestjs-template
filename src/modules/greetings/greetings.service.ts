import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Greeting } from './interfaces/greeting.interface';
import { CreateGreetingDto } from './dto/create-greeting.dto';
import { UpdateGreetingDto } from './dto/update-greeting.dto';
import { GREETING_MODEL } from './greetings.provider';

@Injectable()
export class GreetingsService {
  constructor(
    @Inject(GREETING_MODEL) private readonly greetingModel: Model<Greeting>,
  ) {}

  create(data: CreateGreetingDto) {
    const greeting = new this.greetingModel(data);
    return greeting.save();
  }

  findAll() {
    return this.greetingModel.find().exec();
  }

  findOne(id: string) {
    return this.greetingModel.findById(id).exec();
  }

  update(id: string, data: UpdateGreetingDto) {
    return this.greetingModel.updateOne({ _id: id }, data).exec();
  }

  remove(id: string) {
    return this.greetingModel.deleteOne({ _id: id }).exec();
  }
}
