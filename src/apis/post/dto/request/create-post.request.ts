import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { postMode } from '../../entities/post.entity';

export class CreatePostRequest {
  @ApiProperty({
    example: 'title',
    description: '제목',
    required: true,
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    example: 'mode',
    description: '모드',
    required: true,
  })
  @IsString()
  readonly mode: postMode;

  @ApiProperty({
    example: 'contentMarkdown',
    description: '내용 markdown',
    required: true,
  })
  @IsString()
  readonly contentMarkdown: string;

  @ApiProperty({
    example: 'contentWysiwyg',
    description: '내용 wysiwyg',
    required: true,
  })
  @IsString()
  readonly contentWysiwyg: string;
}
