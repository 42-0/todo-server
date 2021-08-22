import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('유저')
@Controller('api/user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @ApiOperation({ summary: 'me' })
  @Get('me')
  findById(@Req() req) {
    return this.usersService.getUserInfo(req.user.id);
  }
}
