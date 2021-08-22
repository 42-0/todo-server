import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindAllPostRequest {
  constructor(sequence: number, limit: number) {
    this.sequence = sequence;
    this.limit = limit;
  }

  @ApiProperty({
    example: 'sequence',
    description: '마지막데이터id',
    required: false,
  })
  @IsOptional()
  // @IsNotEmpty()
  readonly sequence: number = 0;

  @ApiProperty({
    example: 'limit',
    description: 'limit',
    required: false,
  })
  @IsOptional()
  // @IsNotEmpty()
  readonly limit: number = 20;
}
