import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { getClientIp } from '@supercharge/request-ip';

@Injectable()
export class IpWhitelistGuard implements CanActivate {
  constructor(
    @Inject(Reflector.name) protected readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    // Define whitelist IP
    const ipsWhiteList = ['0.0.0.0', '::1', '192.168.1.1'];

    // If there is no @IpsFilter or it's empty, do not use the filter
    if (!ipsWhiteList || ipsWhiteList.length === 0) {
      return true;
    }

    // Extract the IP from request context
    const clientIp = getClientIp(context.switchToHttp().getRequest());

    // Check the client's IP against the white list
    return ipsWhiteList.includes(clientIp);
  }
}
