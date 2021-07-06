import { OnModuleInit } from '@nestjs/common';

export async function buildDeferInitService<T extends OnModuleInit>(service: T): Promise<T> {
  await service.onModuleInit();
  return service;
}
