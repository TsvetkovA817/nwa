import { BaseNewsDto } from './base-news.dto';

export class UpdateNewsDto extends BaseNewsDto {
  completedAt: Date;
}