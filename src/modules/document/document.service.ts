import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Chunk } from './schemas/chunk.schema';
import { Document } from './schemas/document.schema';

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel(Document.name) private readonly documentModel: Model<Document>,
    @InjectModel(Chunk.name) private readonly chunkModel: Model<Chunk>,
  ) {}

  async create(document: Express.Multer.File) {
    const chunk = await new this.chunkModel({
      data: document.buffer,
      type: document.mimetype,
      size: document.size,
    }).save();
    const createdDocument = new this.documentModel({
      chunk: chunk._id,
      type: document.mimetype,
      name: document.originalname,
      path: `/document/${chunk._id}/${document.originalname}`,
    });
    return createdDocument.save();
  }

  async createMany(documents: Express.Multer.File[]) {
    return Promise.all(
      documents.map(async (document) => {
        return this.create(document);
      }),
    );
  }

  getChunk(chunkId: string) {
    return this.chunkModel.findById(chunkId).exec();
  }
}
