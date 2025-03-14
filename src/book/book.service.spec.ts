import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { getModelToken } from '@nestjs/mongoose';
import { Book, Category } from './schemas/book.schema';
import { Model } from 'mongoose';

describe('BookService', () => {
  let bookService: BookService;
  let model: Model<Book>;

  const mockBook = {
    _id: '61c0ccf11d7bf83d153d7c06',
    user: '61c0ccf11d7bf83d153d7c06',
    title: 'Book 1',
    author: 'Author 1',
    description: 'Description 1',
    images: ['image1.jpg', 'image2.jpg'],
    price: 10,
    category: Category.Fantasy
  }

  let mockBookService = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getModelToken(Book.name),
          useValue: mockBookService,
        },
      ],
    }).compile();

    bookService = module.get<BookService>(BookService);
    model = module.get<Model<Book>>(getModelToken(Book.name));
  });

  describe('findAll', () => {
    it('It should find and return a book by id.', async () => {
      jest.spyOn(model, 'findById').mockReturnValue(mockBook as any);
      const result = await bookService.findById(mockBook._id);
      expect(result).toEqual(mockBook);
    });
  });
});
