import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { LogService } from './log.service';
import { UseAuth } from '../auth/decorators/auth.decorator';
import { CreateLogDto } from './dto/create-log.dto';
import { UsersService } from '../users/users.service';
import { ApiTags } from '@nestjs/swagger';
import { UserDocument } from '../users/schemas/user.schema';
import { Request } from 'express';

@Controller('log')
@ApiTags('Log')
export class LogController {
  constructor(
    private logService: LogService,
    private userService: UsersService,
  ) {}

  @Post()
  async create(
    @Body() createLogDto: CreateLogDto,
    req: Request & { user: UserDocument },
  ) {
    const user = await this.userService.findById(createLogDto.user);
    if (!user) throw new BadRequestException('User not found');
    return this.logService.create(
      req,
      createLogDto.level,
      createLogDto.message,
    );
  }

  @UseAuth()
  @Get()
  async findAll() {
    return this.logService.findAll();
  }
}
