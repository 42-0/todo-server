import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostQueryRepository } from './repository/postQueryRepository';
import { PrismaService } from '../../prisma/prisma.service';
import { LogService } from '../log/log.service';

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService, PostQueryRepository, LogService],
})
export class PostModule {}
