import { CreateLogDto } from './dto/create-log.dto';

export const getLogItem = (req): CreateLogDto => {
  const ip: string = req.get('x-forwarded-for');
  const userAgent: string = req.headers['user-agent'];
  return new CreateLogDto(ip, userAgent);
};
