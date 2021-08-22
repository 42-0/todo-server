import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostRequest } from './dto/request/create-post.request';
import { PostQueryRepository } from './repository/postQueryRepository';
import { JwtInfo } from '../auth/models/jwt.model';
import { LogService } from '../log/log.service';
import { FindAllPostRequest } from './dto/request/findAll-post.request';
import { UpdatePostRequest } from './dto/request/update-post.request';

@Injectable()
export class PostService {
  constructor(
    private readonly postQueryRepository: PostQueryRepository,
    private readonly logService: LogService,
  ) {}

  async create(req, createPostRequest: CreatePostRequest) {
    const jwtInfo: JwtInfo = req.user;
    const post = await this.postQueryRepository.create(
      jwtInfo,
      createPostRequest,
    );
    await this.logService.createLogPost(req, post.id);
    return HttpStatus.CREATED;
  }

  findAll(findAllPostRequest: FindAllPostRequest) {
    return this.postQueryRepository.findByAll(findAllPostRequest);
  }

  findOne(id: number) {
    return this.postQueryRepository.findById(id);
  }

  postValidator = async (id: number, jwtInfo: JwtInfo) => {
    const post = await this.postQueryRepository.findByIdAll(id);
    if (jwtInfo.id !== post.createdId) {
      throw new HttpException('Author id not match.', HttpStatus.BAD_REQUEST);
    }
    if (post.deletedAt) {
      throw new HttpException(
        `This post has already been deleted. id:${post.id}, deletedAt:${post.deletedAt}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  };

  async update(req, id, updatePostRequest: UpdatePostRequest) {
    const jwtInfo: JwtInfo = req.user;
    await this.postValidator(id, jwtInfo);
    await this.postQueryRepository.update(jwtInfo, id, updatePostRequest);
    return HttpStatus.OK;
  }

  async remove(req, id: number) {
    const jwtInfo: JwtInfo = req.user;
    await this.postValidator(id, jwtInfo);
    await this.postQueryRepository.delete(jwtInfo, id);
    return HttpStatus.OK;
  }
}
