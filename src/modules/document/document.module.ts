import { Document, DocumentSchema } from './schemas/document.schema';
import { Chunk, ChunkSchema } from './schemas/chunk.schema';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Document.name,
        schema: DocumentSchema,
      },
      {
        name: Chunk.name,
        schema: ChunkSchema,
      },
    ]),
  ],
  providers: [DocumentService],
  exports: [DocumentService],
  controllers: [DocumentController],
})
export class DocumentModule {}
