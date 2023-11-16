import { LevelEnum } from '../enums/level.enum';
import { IsEnum, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { IsUserExists } from "../../../common/validation/user-exists.validator";

export class CreateLogDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsEnum(LevelEnum)
  level: LevelEnum;

  @IsNotEmpty()
  @IsString()
  @IsUserExists()
  user: string;

  @IsObject()
  meta: any;
}
