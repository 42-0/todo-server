import { PrismaService } from '../../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreatePostRequest } from '../dto/request/create-post.request';
import { JwtInfo } from '../../auth/models/jwt.model';
import { FindAllPostRequest } from '../dto/request/findAll-post.request';
import dayjs from 'dayjs';
import { UpdatePostRequest } from '../dto/request/update-post.request';

enum SelectType {
  all = 'all',
  one = 'one',
}

@Injectable()
export class PostQueryRepository {
  constructor(private readonly prisma: PrismaService) {}

  getPostSelect = (selectType: SelectType) => {
    const defaultFiled = {
      id: true,
      title: true,
      views: true,
      createdId: true,
      createdAt: true,
      likes: true,
      log: true,
    };

    if (selectType === SelectType.all) {
      return {
        ...defaultFiled,
      };
    }

    if (selectType === SelectType.one) {
      return {
        ...defaultFiled,
        comments: true,
      };
    }
  };

  async findById(id: number) {
    return await this.prisma.post.findUnique({
      where: {
        id: id,
      },
      select: this.getPostSelect(SelectType.one),
    });
  }

  async findByIdAll(id: number) {
    return await this.prisma.post.findUnique({
      where: {
        id: id,
      },
    });
  }

  async create(jwtInfo: JwtInfo, createPostRequest: CreatePostRequest) {
    return await this.prisma.post.create({
      data: {
        title: createPostRequest.title,
        mode: createPostRequest.mode,
        contentMarkdown: createPostRequest.contentMarkdown,
        contentWysiwyg: createPostRequest.contentWysiwyg,
        createdUserPost: { connect: { id: jwtInfo.id } },
      },
    });
  }

  async findByAll(findAllPostRequest: FindAllPostRequest) {
    return await this.prisma.post.findMany({
      where: {
        deletedAt: null,
        id: { lt: findAllPostRequest.sequence || undefined },
      },
      select: this.getPostSelect(SelectType.all),
      orderBy: [{ id: 'desc' }],
      take: findAllPostRequest.limit,
    });
  }

  async update(
    jwtInfo: JwtInfo,
    id: number,
    updatePostRequest: UpdatePostRequest,
  ) {
    return await this.prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title: updatePostRequest.title,
        mode: updatePostRequest.mode,
        contentMarkdown: updatePostRequest.contentMarkdown,
        contentWysiwyg: updatePostRequest.contentWysiwyg,
        updatedUserPost: { connect: { id: jwtInfo.id } },
        updatedAt: dayjs().toISOString(),
      },
    });
  }

  async delete(jwtInfo: JwtInfo, id: number) {
    return await this.prisma.post.update({
      where: {
        id: id,
      },
      data: {
        deletedUserPost: { connect: { id: jwtInfo.id } },
        deletedAt: dayjs().toISOString(),
      },
    });
  }
}
