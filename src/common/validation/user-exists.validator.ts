import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '../../modules/users/users.service';
import { Types } from 'mongoose';

@ValidatorConstraint({ async: true })
@Injectable()
export class UserExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly userService: UsersService) {}

  validate(value: string): Promise<boolean> | boolean {
    if (!value) return false;
    if (!Types.ObjectId.isValid(value)) return false;
    return !!this.userService.findById(value);
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} ${validationArguments.value} is not exists`;
  }
}

export function IsUserExists(validationOption?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsUserExist',
      target: object.constructor,
      propertyName,
      options: validationOption,
      validator: UserExistsValidator,
      async: true,
    });
  };
}
