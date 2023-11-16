import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { LogService } from './log.service';
import { UseAuth } from '../auth/decorators/auth.decorator';
import { Log } from './schemas/log.schema';
import { CreateLogDto } from './dto/create-log.dto';
import { UsersService } from '../users/users.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('log')
@ApiTags('Log')
export class LogController {
  constructor(
    private logService: LogService,
    private userService: UsersService,
  ) {}

  @Post()
  async create(@Body() createLogDto: CreateLogDto) {
    const log = new Log();
    log.level = createLogDto.level;
    log.message = createLogDto.message;
    log.meta = createLogDto.meta;
    const user = await this.userService.findById(createLogDto.user);
    if (!user) throw new BadRequestException('User not found');
    log.user = user;
    return this.logService.create(log);
  }

  @UseAuth()
  @Get()
  async findAll() {
    return this.logService.findAll();
  }
}
