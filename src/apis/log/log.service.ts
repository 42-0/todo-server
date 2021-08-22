import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { getLogItem } from './log.function';

@Injectable()
export class LogService {
  constructor(private readonly prisma: PrismaService) {}

  async createLogPost(req, postId: number) {
    const createLogDto: CreateLogDto = getLogItem(req);

    await this.prisma.log.create({
      data: {
        ip: createLogDto.ip,
        userAgent: createLogDto.userAgent,
        postId: postId,
      },
    });
    return HttpStatus.OK;
  }

  findAll() {
    return `This action returns all log`;
  }

  findOne(id: number) {
    return `This action returns a #${id} log`;
  }

  update(id: number, updateLogDto: UpdateLogDto) {
    return `This action updates a #${id} log`;
  }

  remove(id: number) {
    return `This action removes a #${id} log`;
  }
}
