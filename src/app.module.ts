import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './apis/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './apis/auth/auth.module';
import { GoogleStrategy } from './apis/auth/strategies/google.strategy';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from './apis/auth/guards/jwt-auth.guard';
import { RolesGuard } from './apis/auth/guards/roles.guard';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { TimeoutInterceptor } from './interceptor/timeout.interceptor';
import { PostModule } from './apis/post/post.module';
import { LogModule } from './apis/log/log.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['./configs/.env.development', './configs/.env.production'],
    }),
    UserModule,
    AuthModule,
    PostModule,
    LogModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    GoogleStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ErrorsInterceptor,
    // },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
  ],
})
export class AppModule {}
