import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book-dto';
import { UpdateBookDto } from './dto/update-book-dto';
import { AuthGuard } from '@nestjs/passport';

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
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() createBookDto: CreateBookDto, @Req() req) {
        return this.bookService.create(createBookDto, req.user);
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
