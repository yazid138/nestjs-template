import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLaporanDto {
  @IsNotEmpty()
  @IsString()
  description: string;
}
