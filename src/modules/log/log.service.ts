import { Injectable } from '@nestjs/common';
import { Log } from './schemas/log.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { LevelEnum } from './enums/level.enum';
import { getClientIp } from '@supercharge/request-ip';

@Injectable()
export class LogService {
  constructor(@InjectModel(Log.name) private logModel: Model<Log>) {}

  create(req: Request, level: LevelEnum, message: string) {
    const { method, originalUrl, user } = req;
    const ip = getClientIp(req);
    const createdLog = new this.logModel({
      message,
      user,
      level,
      meta: {
        ip,
        method,
        path: originalUrl,
      },
    });
    return createdLog.save();
  }

  findAll() {
    return this.logModel.find().exec();
  }
}
