import { Router } from 'express';

import { BookController } from '../Controllers/BookController';
import { BookRepository } from '../Repositories/BookRepository';
import { BookService } from '../Services/BookService';
import { RedisCacheProvider } from '../Providers/RedisCacheProvider'

import { validate } from '../Middlewares/validate';
import { asyncHandler } from '../Middlewares/asyncHandler';

import {
  getBookSchema,
  createBookSchema,
  updateBookSchema
} from '../Validators/bookSchema';

export const bookRoutes = Router();

const cache = new RedisCacheProvider()
const bookRepository = new BookRepository();
const bookService = new BookService(bookRepository, cache);
const bookController = new BookController(bookService);


bookRoutes.get(
  '/books',
  asyncHandler(bookController.getAllBooks.bind(bookController))
);

bookRoutes.get(
  '/book/:id',
  validate(getBookSchema),
  asyncHandler(bookController.getBook.bind(bookController))
);

bookRoutes.post(
  '/books',
  validate(createBookSchema),
  asyncHandler(bookController.createBook.bind(bookController))
);

bookRoutes.put(
  '/books/:id',
  validate(updateBookSchema),
  asyncHandler(bookController.updateBook.bind(bookController))
);

bookRoutes.delete(
  '/books/:id',
  validate(getBookSchema),
  asyncHandler(bookController.deleteBook.bind(bookController))
);