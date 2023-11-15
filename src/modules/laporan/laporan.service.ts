import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Role } from '../auth/enums/role.enum';
import { CreateLaporanDto } from './dto/create-laporan.dto';
import { DocumentService } from '../document/document.service';
import { InjectModel } from '@nestjs/mongoose';
import { Laporan } from './schemas/laporan.schema';
import { UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class LaporanService {
  constructor(
    @InjectModel(Laporan.name) private laporanModel: Model<Laporan>,
    private documentService: DocumentService,
  ) {}

  async create(
    user: UserDocument,
    file: Express.Multer.File,
    data: CreateLaporanDto,
  ) {
    const document = await this.documentService.create(file);
    const laporan = new this.laporanModel({
      ...data,
      role: user.role,
      document: document._id,
      createdBy: user._id,
      updatedBy: user._id,
    });
    return laporan.save();
  }

  findAll(role: Role) {
    return this.laporanModel
      .find({ role })
      .populate({ path: 'document', select: '-chunk' })
      .exec();
  }

  findById(_id: string, role: Role) {
    return this.laporanModel.findOne({ _id, role }).exec();
  }

  removeById(_id: string) {
    return this.laporanModel.findByIdAndDelete(_id).exec();
  }
}
