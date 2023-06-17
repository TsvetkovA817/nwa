import { Body, Controller, Get, Header, Post, Delete,Param,Put, UseInterceptors, Inject } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';
import { CacheInterceptor, CacheKey, CacheTTL  } from '@nestjs/cache-manager';

import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { NewsService } from './news.service';
 

export class CreateNewsDtoArr {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}

@Controller('news')
export class NewsController {
  constructor(
     private readonly service: NewsService,
     ) {}

  @Get('/all')
  @UseInterceptors(CacheInterceptor)
  @CacheKey('auto-caching-getall')
  @CacheTTL(10)
  async index() {
    return await this.service.findAll();
  }


  @Get('/details/:id')
  @UseInterceptors(CacheInterceptor)
  @CacheKey('auto-caching-getnewsid')
  @CacheTTL(10)
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  
  @Get('/top10')
  @UseInterceptors(CacheInterceptor)
  @CacheKey('auto-caching-gettop10authors')
  @CacheTTL(10)
  async top10author() {
    const arrFromDb=await this.service.getAuthors();
    const arr2=[];
    for await (const el of arrFromDb) {
      arr2.push({title:el});
    }  
    return JSON.stringify(arr2);;
  }


  @Post('/add')
  async create(@Body() createNewsDto: CreateNewsDto) {
    return await this.service.create(createNewsDto);
  }

  @Put('/edit/:id')
  async update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return await this.service.update(id, updateNewsDto);
  }

  @Delete('/del/:id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }


  //предыдущие функции для работы с массивом

  @UseInterceptors(CacheInterceptor)
  @Get('/arr')
  async getNews() {
    return new Promise(resolve => {
      const news = Object.keys([...Array(20)])
        .map(key => Number(key) + 1)
        .map(n => ({
          id: n,
          title: `Важная новость ${n}`,
          description: (rand => ([...Array(rand(1000))].map(() => rand(10**16).toString(36).substring(rand(10))).join(' ')))(max => Math.ceil(Math.random() * max)),
          createdAt: Date.now()
        }))

      setTimeout(() => {
        resolve(news);
      }, 100)
    });
  }


  @Post('/arr')
  @Header('Cache-Control', 'none')
  create1(@Body() peaceOfNews: CreateNewsDtoArr) {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('Новость успешно создана', peaceOfNews);
        resolve({ id: Math.ceil(Math.random() * 1000), ...peaceOfNews });
      }, 100)
    });
  }
}
