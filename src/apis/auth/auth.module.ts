import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { UserQueryRepository } from '../users/repository/userQueryRepository';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '99999999s' },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    PrismaService,
    UsersService,
    UserQueryRepository,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
