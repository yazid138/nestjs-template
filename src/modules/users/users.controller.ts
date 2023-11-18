import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UseAuth } from '../auth/decorators/auth.decorator';
import { Request } from 'express';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async register(@Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
    return { message: 'User created' };
  }

  @UseAuth()
  @ApiBearerAuth()
  @Get()
  async getProfile(@Req() req: Request & { user: any }) {
    return req.user;
  }
}
