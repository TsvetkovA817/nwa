import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News, NewsDocument } from './schemas/news.schema';

import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

import { createClient } from 'redis';

@Injectable()
export class NewsService {
    constructor(@InjectModel(News.name) private readonly model: Model<NewsDocument>,
    ) {}

    async findAll(): Promise<News[]> {
        return await this.model.find().exec();
      }
    
      async findOne(id: string): Promise<News> {
        return await this.model.findById(id).exec();
      }

      
      async getAuthors(){
        const authors=await this.model.find({},{author:1, _id: 0}).exec();
        const client = createClient();
        await client.connect();
        
        authors.forEach(async (el)=>{
          if (el.author){
            await client.SADD ('Authors' ,el.author.toString());    
          }
        });     

        const arrAvt = await client.SMEMBERS('Authors');
        console.log(arrAvt);
        
        await this.f1(arrAvt,client); 
        //const arrTop = await client.ZRANGE("avt4", 0, -1);  //все записи
        const arrTop = await client.ZRANGE("avt4", 0, 2, {REV:true} );   //топ-3
        //const arrTop = await client.ZRANGE("avt4", 0, 9, {REV:true} );  //топ-10

        return arrTop;
      }

      async f1(pArr, client){
        if(!pArr){
              return
        }
        for await (const el of pArr) {
          if (el){
            const c1:number= await this.model.find({ author: el }).count();
            console.log('кол',c1, el);    
             if (c1 && el){
               await client.ZADD("avt4", {score:c1,value:el});    
             }
          }
        }
      }  
    

      async create(createNewsDto: CreateNewsDto): Promise<News> {
        return await new this.model({
          ...createNewsDto,
          createdAt: new Date(),
        }).save();
      }
    
      async update(id: string, updateNewsDto: UpdateNewsDto): Promise<News> {
        return await this.model.findByIdAndUpdate(id, updateNewsDto).exec();
      }
    
      async delete(id: string): Promise<News> {
        return await this.model.findByIdAndDelete(id).exec();
      }

}
