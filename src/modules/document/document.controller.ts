import { Controller, Get, Param, Res } from '@nestjs/common';
import { Readable } from 'stream';
import { Response } from 'express';
import { DocumentService } from './document.service';
import { ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from '../../common/pipes/parse-objectid.pipe';

@Controller('document')
@ApiTags('Document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get(':chunkId/:name')
  async getMedia(
    @Param('chunkId', ParseObjectIdPipe) chunkId: string,
    @Param('name') name: string,
    @Res() res: Response,
  ) {
    const chunk = await this.documentService.getChunk(chunkId);
    const stream = new Readable();
    stream.push(chunk.data);
    stream.push(null);
    res.type(chunk.type);
    stream.pipe(res);
  }
}
