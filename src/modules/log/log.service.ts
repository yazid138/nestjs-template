import { Injectable } from '@nestjs/common';
import { Log } from './schemas/log.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class LogService {
  constructor(@InjectModel(Log.name) private logModel: Model<Log>) {}

  create(log: Log): Promise<Log> {
    const createdLog = new this.logModel(log);
    return createdLog.save();
  }
}
