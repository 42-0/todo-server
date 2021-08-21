import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequest {
  @ApiProperty({
    example: 'email@gmail.com',
    description: '이메일',
    required: true,
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'password',
    description: '비밀번호',
    required: true,
  })
  @IsString()
  readonly password: string;
}
