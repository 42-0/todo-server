import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginRequest } from './dto/request/login.request';
import { UsersService } from '../users/users.service';
import { SignupRequest } from './dto/request/signup.request';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  createdJwt(id: number, email: string, role: string): string {
    const payload = { id: id, email: email, roles: role };
    return this.jwtService.sign(payload);
  }

  async login(loginAuthDto: LoginRequest) {
    const user = await this.usersService.login(
      loginAuthDto.email.trim(),
      loginAuthDto.password.trim(),
    );
    return {
      accessToken: this.createdJwt(user.id, user.email, user.role),
    };
  }

  async signup(signupRequest: SignupRequest) {
    const user = await this.usersService.signup(signupRequest);
    return {
      accessToken: this.createdJwt(user.id, user.email, user.role),
    };
  }

  googleLogin(req, res) {
    // console.log('res :', res);
    if (!req.user) {
      return 'No user from google';
    }
    const result = {
      message: 'User information from google',
      user: req.user,
    };
    console.log(result);
    const token = this.jwtService.sign(req.user);
    // TODO : token 수정
    // const token = this.createdJwt(req.user.id, req.user.email, req.user.role);
    res.redirect(`${process.env.APP_URL}?token=${token}`);
    return;
  }
}
