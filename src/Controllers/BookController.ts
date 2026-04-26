import { Request, Response, NextFunction } from 'express';
import { BookService } from '../Services/BookService';

export class BookController {
    
    constructor(private bookService: BookService) {}

    async getAllBooks(request: Request, response: Response) {
        const books = await this.bookService.getAllBooks();

        return response.status(200).json({ data: books })
    }

    async getBook(request: Request, response: Response) {
        const id = Number(request.params.id)
        const book =  await this.bookService.getBook(id);

        return response.status(200).json({ data: book})
    }

    async createBook(request: Request, response: Response) {
        const book = request.body;
        const createdBook = this.bookService.createBook(book);

        return response.status(201).json({ data: createdBook })
    }

    async updateBook(request: Request, response: Response) {
        const id = Number(request.params.id);
        const data = request.body;
        const updatedBook = await this.bookService.updateBook(id, data);

        return response.status(200).json({data: updatedBook});
    }

    async deleteBook(request: Request, response: Response) {
        const id = Number(request.params.id);
        const deletedBook = await this.bookService.deleteBook(id);

        return response.status(200).json({message: 'Livro deletado com sucesso'})
    }
}