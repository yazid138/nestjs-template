import { LevelEnum } from '../enums/level.enum';
import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IsUserExists } from '../../../common/validation/user-exists.validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class Meta {
  @IsOptional()
  @IsString()
  os?: string;

  @IsOptional()
  @IsString()
  ip?: string;

  @IsOptional()
  @IsString()
  userAgent?: string;

  @IsOptional()
  @IsString()
  method?: string;

  @IsOptional()
  @IsString()
  path?: string;
}

export class CreateLogDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty({ enum: LevelEnum })
  @IsNotEmpty()
  @IsEnum(LevelEnum)
  level: LevelEnum;

  @IsOptional()
  @IsString()
  @IsUserExists()
  user?: string;

  @ApiProperty({ type: Meta })
  @IsOptional()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => Meta)
  meta?: Meta;
}
