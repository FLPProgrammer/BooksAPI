import { BookController } from './BookController';
import { BookService } from '../Services/BookService';
import { Request, Response } from 'express';

describe('BookController', () => {
    let controller: BookController;
    let service: jest.Mocked<BookService>;
    let request: Partial<Request>;
    let response: Partial<Response>;

    beforeEach(() => {
        service = {
            getAllBooks: jest.fn(),
            getBook: jest.fn(),
            createBook: jest.fn(),
            updateBook: jest.fn(),
            deleteBook: jest.fn(),
        } as unknown as jest.Mocked<BookService>;
        
        controller = new BookController(service);

        response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        request = {};
    });

    it('deve retornar todos os livros com status 200', () => {
        const books = [
            { id: 1, name: 'Livro', author: 'Autor', url: 'url', description: 'desc' }
        ];

        service.getAllBooks.mockReturnValue(books);

        controller.getAllBooks(request as Request, response as Response);

        expect(service.getAllBooks).toHaveBeenCalled();
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({ data: books });
    });

    it('deve retornar um livro por ID', () => {
        const book = { id: 1, name: 'Livro', author: 'Autor', url: 'url', description: 'desc' };

        request = { params: { id: '1' } };

        service.getBook.mockReturnValue(book);

        controller.getBook(request as Request, response as Response);

        expect(service.getBook).toHaveBeenCalledWith(1);
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({ data: book });
    });

    it('deve criar um livro e retornar status 201', () => {
        const book = { id: 1, name: 'Livro', author: 'Autor', url: 'url', description: 'desc' };

        request = { body: book };

        service.createBook.mockReturnValue(undefined);

        controller.createBook(request as Request, response as Response);

        expect(service.createBook).toHaveBeenCalledWith(book);
        expect(response.status).toHaveBeenCalledWith(201);
        expect(response.json).toHaveBeenCalledWith({ data: undefined });
    });

    it('deve atualizar um livro', () => {
        const updated = { id: 1, name: 'Novo', author: 'Autor', url: 'url', description: 'desc' };

        request = {
            params: { id: '1' },
            body: { name: 'Novo' }
        };

        service.updateBook.mockReturnValue(updated);

        controller.updateBook(request as Request, response as Response);

        expect(service.updateBook).toHaveBeenCalledWith(1, { name: 'Novo' });
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({ data: updated });
    });

    it('deve deletar um livro', () => {
        request = { params: { id: '1' } };

        service.deleteBook.mockReturnValue(true);

        controller.deleteBook(request as Request, response as Response);

        expect(service.deleteBook).toHaveBeenCalledWith(1);
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({ message: 'Livro deletado com sucesso' });
    });
});