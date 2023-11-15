import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { LAPORAN_MODEL } from './laporan.provider';
import { Laporan } from './interfaces/laporan.interface';
import { Role } from '../auth/enums/role.enum';
import { CreateLaporanDto } from './dto/create-laporan.dto';
import { User } from '../users/interfaces/user.interface';
import { DocumentService } from '../document/document.service';

@Injectable()
export class LaporanService {
  constructor(
    @Inject(LAPORAN_MODEL) private laporanModel: Model<Laporan>,
    private documentService: DocumentService,
  ) {}

  async create(user: User, file: Express.Multer.File, data: CreateLaporanDto) {
    const media = await this.documentService.create(file);
    const laporan = new this.laporanModel({
      ...data,
      role: user.role,
      document: media._id,
      createdBy: user._id,
      updatedBy: user._id,
    });
    return laporan.save();
  }

  findAll(role: Role) {
    return this.laporanModel.find({ role }).populate('document').exec();
  }

  findById(_id: string, role: Role) {
    return this.laporanModel.findOne({ _id, role }).exec();
  }

  removeById(_id: string) {
    return this.laporanModel.findByIdAndDelete(_id).exec();
  }
}
