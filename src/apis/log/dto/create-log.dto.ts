import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateLogDto {
  constructor(ip: string, userAgent: string) {
    this.ip = ip;
    this.userAgent = userAgent;
  }

  @ApiProperty({
    example: 'ip',
    description: '로그',
    required: true,
  })
  @IsString()
  readonly ip: string;

  @ApiProperty({
    example: 'userAgent',
    description: '유저에이전트',
    required: true,
  })
  @IsString()
  readonly userAgent: string;
}
