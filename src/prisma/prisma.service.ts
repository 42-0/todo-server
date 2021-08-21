import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient<
  Prisma.PrismaClientOptions,
  'query'
> {
  constructor() {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        `warn`,
        `error`,
      ],
    });

    this.$on('query', (e) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(e);
      }
    });
  }
}
