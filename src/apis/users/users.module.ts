import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { UserQueryRepository } from './repository/userQueryRepository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UserQueryRepository],
})
export class UsersModule {}
