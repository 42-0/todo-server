import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostRequest {
  @ApiProperty({
    example: 'title',
    description: '제목',
    required: true,
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    example: 'content',
    description: '내용',
    required: true,
  })
  @IsString()
  readonly content: string;
}
