import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { documentModelProvider } from './document.provider';
import { DatabaseModule } from '../../database/database.module';
import { chunkModelProvider } from './chunk/chunk.provider';
import { DocumentController } from './document.controller';

@Module({
  imports: [DatabaseModule],
  providers: [DocumentService, documentModelProvider, chunkModelProvider],
  exports: [DocumentService],
  controllers: [DocumentController],
})
export class DocumentModule {}
