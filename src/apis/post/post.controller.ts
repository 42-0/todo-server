import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostRequest } from './dto/request/create-post.request';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FindAllPostRequest } from './dto/request/findAll-post.request';
import { UpdatePostRequest } from './dto/request/update-post.request';

@ApiTags('게시판')
@Controller('api/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: '게시판 등록' })
  @Post()
  create(@Req() req, @Body() createPostRequest: CreatePostRequest) {
    return this.postService.create(req, createPostRequest);
  }

  @ApiOperation({ summary: '게시판 전체 조회' })
  @Get()
  findAll(
    @Query('sequence', new DefaultValuePipe(0), ParseIntPipe) sequence: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ) {
    const findAllPostRequest = new FindAllPostRequest(sequence, +limit);
    return this.postService.findAll(findAllPostRequest);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  update(
    @Req() req,
    @Param('id') id: number,
    @Body() updatePostRequest: UpdatePostRequest,
  ) {
    return this.postService.update(req, id, updatePostRequest);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: number) {
    return this.postService.remove(req, id);
  }
}
