import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

import { MongooseModule } from '@nestjs/mongoose';
import { News, NewsSchema } from './schemas/news.schema';

@Module({
  controllers: [NewsController],
  providers: [NewsService],
  imports: [
    MongooseModule.forFeature([{ name: News.name, schema: NewsSchema }]),
  ],
})
export class NewsModule {}
