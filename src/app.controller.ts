import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HealthCheck } from '@nestjs/terminus';
import { HealthCheckService } from '@nestjs/terminus/dist/health-check';
import { MemoryHealthIndicator } from '@nestjs/terminus/dist/health-indicator';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Index')
export class AppController {
  constructor(
    private configService: ConfigService,
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
  ) {}

  @Get()
  async getInfo() {
    return {
      name: this.configService.get<string>('APP_NAME'),
      desc: `${this.configService.get<string>('APP_NAME')} API Service`,
      version: '1.0.0',
      status: 'API Service Ready!',
    };
  }

  @Get('health')
  @HealthCheck()
  async check(): Promise<any> {
    return {
      data: await this.health.check([
        async () => this.memory.checkHeap('memory_heap', 200 * 1024 * 1024),
        async () => this.memory.checkRSS('memory_rss', 3000 * 1024 * 1024),
      ]),
    };
  }
}
