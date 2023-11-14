import { UseGuards } from '@nestjs/common/decorators';
import { applyDecorators, SetMetadata } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

export const Auth_KEY = 'auth';
export const UseAuth = () =>
  applyDecorators(SetMetadata(Auth_KEY, null), UseGuards(JwtAuthGuard));
