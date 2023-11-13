import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { GreetingsService } from './greetings.service';
import { CreateGreetingDto } from './dto/create-greeting.dto';
import { UpdateGreetingDto } from './dto/update-greeting.dto';
import { ApiTags } from '@nestjs/swagger';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { Role } from '../auth/enums/role.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { MyContext } from '../../common/context/my-context';
import { RequestContext } from '@medibloc/nestjs-request-context';

@Controller('greetings')
@ApiTags('Greeting')
export class GreetingsController {
  constructor(private greetingsService: GreetingsService) {}

  @Roles(Role.User)
  @Post()
  async create(@Body() createGreetingDto: CreateGreetingDto) {
    return this.greetingsService.create(createGreetingDto);
  }

  @Get()
  findAll() {
    return this.greetingsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.greetingsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateGreetingDto: UpdateGreetingDto,
  ) {
    return this.greetingsService.update(id, updateGreetingDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.greetingsService.remove(id);
  }
}
