import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book-dto';
import { UpdateBookDto } from './dto/update-book-dto';

@Controller('book')
export class BookController {
    constructor(private bookService: BookService) {}

    @Get()
    async findAll(@Query() query?: ExpressQuery) {
        return this.bookService.findAll(query);
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        return this.bookService.findById(id);
    }

    @Post()
    async create(@Body() createBookDto: CreateBookDto) {
        return this.bookService.create(createBookDto);
    } 

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
        return this.bookService.update(id, updateBookDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.bookService.delete(id);
    }
    
}
