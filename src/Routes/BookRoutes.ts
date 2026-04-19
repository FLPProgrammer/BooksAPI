import { Request, Response } from 'express';
import { Router } from 'express';

import { BookController } from '../Controllers/BookController';
import { BookRepository } from '../Repositories/BookRepository';
import { BookService } from '../Services/BookService';


export const bookRoutes = Router();

const bookRepository = new BookRepository();
const bookService = new BookService(bookRepository)
const bookController = new BookController(bookService)

bookRoutes.get('/books', bookController.getAllBooks);
bookRoutes.get('/book/:id', bookController.getBook);
bookRoutes.post('/books', bookController.createBook);
bookRoutes.put('/books/:id', bookController.updateBook);
bookRoutes.delete('/books/:id', bookController.deleteBook);