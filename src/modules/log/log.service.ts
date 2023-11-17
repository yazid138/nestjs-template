import { Injectable } from '@nestjs/common';
import { Log } from './schemas/log.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { getClientIp } from '@supercharge/request-ip';
import { UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class LogService {
  constructor(@InjectModel(Log.name) private logModel: Model<Log>) {}

  create(req: Request & { user: UserDocument }, log: Log) {
    const { method, originalUrl, headers } = req;
    const ip = getClientIp(req);
    const createdLog = new this.logModel({
      message: log.message,
      user: log.user,
      level: log.level,
      meta: {
        ip,
        method: log.meta?.method || method,
        path: log.meta?.path || originalUrl,
        userAgent: log.meta?.userAgent || headers['user-agent'],
        os: log.meta?.os,
      },
    });
    return createdLog.save();
  }

  findAll() {
    return this.logModel
      .find()
      .populate({ path: 'user', select: '-password' })
      .exec();
  }
}
