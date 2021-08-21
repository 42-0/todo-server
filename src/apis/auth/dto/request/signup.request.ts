import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupRequest {
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
  @MinLength(8)
  readonly password: string;

  @ApiProperty({
    example: '길동',
    description: '이름',
    required: true,
  })
  @IsString()
  readonly firstName: string;

  @ApiProperty({
    example: '홍',
    description: '성',
    required: true,
  })
  @IsString()
  readonly lastName: string;
}
