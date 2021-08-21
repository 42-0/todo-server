import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { AuthService } from './auth.service';
import { LoginRequest } from './dto/request/login.request';
import { SignupRequest } from './dto/request/signup.request';
import { AuthGuard } from '@nestjs/passport';

@Public()
@ApiTags('로그인 && 회원가입')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  async login(@Body() loginRequest: LoginRequest) {
    return this.authService.login(loginRequest);
  }

  @ApiOperation({ summary: '회원가입' })
  @Post('signup')
  signup(@Body() signupRequest: SignupRequest) {
    return this.authService.signup(signupRequest);
  }

  @ApiOperation({ summary: 'google' })
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @ApiOperation({ summary: 'google callback' })
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Res() res) {
    return this.authService.googleLogin(req, res);
  }
}
