import { Request, Response, NextFunction } from 'express';
import { BookService } from '../Services/BookService';

export class BookController {
    
    constructor(private bookService: BookService) {}

    getAllBooks(request: Request, response: Response) {
        const books = this.bookService.getAllBooks();

        return response.status(200).json({ data: books })
    }

    getBook(request: Request, response: Response) {
        const id = Number(request.params.id)
        const book = this.bookService.getBook(id);

        return response.status(200).json({ data: book})
    }

    createBook(request: Request, response: Response) {
        const book = request.body;
        const createdBook = this.bookService.createBook(book);

        return response.status(201).json({ data: createdBook })
    }

    updateBook(request: Request, response: Response) {
        const id = Number(request.params.id);
        const data = request.body;
        const updatedBook = this.bookService.updateBook(id, data);

        return response.status(200).json({data: updatedBook});
    }

    deleteBook(request: Request, response: Response) {
        const id = Number(request.params.id);
        const deletedBook = this.bookService.deleteBook(id);

        return response.status(200).json({message: 'Livro deletado com sucesso'})
    }
}