import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';

import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { MongooseModule } from '@nestjs/mongoose';

//eslint-disable-next-line @typescript-eslint/no-var-requires
const redisStore = require("cache-manager-redis-store").redisStore;
//import { redisStore } from 'cache-manager-redis-yet';

@Module({
    imports: [
  CacheModule.register({store: redisStore, 
      host: 'localhost', 
      port: 6379,
      isGlobal: true,
      ttl: 10 
    }),   
    MongooseModule.forRoot('mongodb://localhost/newsdb'),
    NewsModule, 
],
  controllers: [AppController],
  providers: [AppService,  
     {
    provide: APP_INTERCEPTOR,
    useClass: CacheInterceptor,  },
  ],
})
export class AppModule {}
