import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { UserQueryRepository } from '../user/repository/userQueryRepository';
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
    UserService,
    UserQueryRepository,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
