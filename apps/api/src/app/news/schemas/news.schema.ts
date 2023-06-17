import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NewsDocument = News & Document;

@Schema()
export class News {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop()
  author?: string;
  
  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  completedAt?: Date;

  @Prop()
  deletedAt?: Date;  
}

export const NewsSchema = SchemaFactory.createForClass(News);