import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

export enum Category {
  Action = 'Action',
  Adventure = 'Adventure',
  Comedy = 'Comedy',
  Drama = 'Drama',
  Horror = 'Horror',
  Romance = 'Romance',
  Thriller = 'Thriller',
  SciFi = 'SciFi',
  Fantasy = 'Fantasy',
  Mystery = 'Mystery',
  Historical = 'Historical',
  Classic = 'Classic',
}

@Schema({
  timestamps: true,
})
export class Book {
  @Prop({ required: true, unique: true, index: true, trim: true })
  title: string;

  @Prop({ required: true, trim: true })
  description: string;

  @Prop({ required: true, trim: true })
  author: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  category: Category;

  @Prop({ required:true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const BookSchema = SchemaFactory.createForClass(Book);
