import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { LogService } from './log.service';
import { UseAuth } from '../auth/decorators/auth.decorator';
import { CreateLogDto } from './dto/create-log.dto';
import { UsersService } from '../users/users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDocument } from '../users/schemas/user.schema';
import { Request } from 'express';
import { Log } from './schemas/log.schema';

@Controller('log')
@ApiTags('Log')
export class LogController {
  constructor(
    private logService: LogService,
    private userService: UsersService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create log',
    description: 'Ini adalah deskripsi dari API',
  })
  async create(
    @Body() createLogDto: CreateLogDto,
    @Req() req: Request & { user: UserDocument },
  ) {
    let user: UserDocument;
    if (createLogDto.user) {
      user = await this.userService.findById(createLogDto.user);
      if (!user) throw new BadRequestException('User not found');
    }
    await this.logService.create(
      req,
      new Log(
        createLogDto.level,
        createLogDto.message,
        user,
        createLogDto.meta,
      ),
    );
    return { message: 'Log created successfully' };
  }

  @UseAuth()
  @Get()
  @ApiOperation({ summary: 'Get all log' })
  async findAll() {
    return this.logService.findAll();
  }
}
