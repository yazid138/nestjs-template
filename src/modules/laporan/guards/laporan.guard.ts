import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LaporanService } from '../laporan.service';
import { Request } from 'express';
import { User } from '../../users/interfaces/user.interface';
import { Types } from 'mongoose';

@Injectable()
export class LaporanGuard implements CanActivate {
  constructor(private laporanService: LaporanService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const http = ctx.switchToHttp();
    const req = http.getRequest<Request & { user: User }>();
    const user = req.user;
    const _id = req.params.id;
    if (!Types.ObjectId.isValid(_id))
      throw new BadRequestException('Invalid ObjectId');
    const laporan = await this.laporanService.findById(_id, user.role);
    if (!laporan) throw new NotFoundException();
    return true;
  }
}
