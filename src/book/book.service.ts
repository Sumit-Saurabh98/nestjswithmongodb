import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Book } from './schemas/book.schema';
import mongoose from 'mongoose';
import { CreateBookDto } from './dto/create-book-dto';
import { UpdateBookDto } from './dto/update-book-dto';
import { User } from 'src/auth/schemas/user.schema';
import { uploadImagesOnAWS } from 'src/utils/aws';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(query?: ExpressQuery) {

    const resPerPage = 2;
    const currentPage = Number(query?.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    if (query) {
      const keyword = query.keyword
        ? {
            title: {
              $regex: query.keyword,
              $options: 'i',
            },
          }
        : {};

      const books = await this.bookModel.find({ ...keyword }).limit(resPerPage).skip(skip).exec();
      return books;
    }

    const books = await this.bookModel.find().exec();
    return books;

  }

  async findById(id: string) {

    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      return new NotFoundException('Book not found with that id.');
    }
    const books = await this.bookModel.findById(id).exec();
    if (!books) {
      return new NotFoundException('Book not found with that id.');
    }

    return books;
  }

  async create(createBookDto: CreateBookDto, user: User) {

    const data = Object.assign(createBookDto, { user: user._id });
    const newBook = await this.bookModel.create(data);
    return newBook;
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const newBook = await this.bookModel
      .findByIdAndUpdate(id, updateBookDto, { new: true, runValidators: true })
      .exec();

    if (!newBook) {
      return new NotFoundException('Book not found with that id.');
    }

    return newBook;
  }

  async delete(id: string) {
    const book = await this.bookModel.findByIdAndDelete(id).exec();
    if (!book) {
      return new NotFoundException('Book not found with that id.');
    }
    return book;
  }

  async uploadImages(id: string, files: Array<Express.Multer.File>) {

    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      return new NotFoundException('Book not found with that id.');
    }
    
    const images = await uploadImagesOnAWS(files);

    book.images = images as object[];
    const newBook = await book.save();
    return newBook;
  }
}
