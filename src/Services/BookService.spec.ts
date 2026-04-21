import { BookService } from './BookService';
import { BookRepository } from '../Repositories/BookRepository';
import { IBook } from '../Types/Book';
import { AppError } from '../Utils/AppError';

describe('BookService', () => {
    let service: BookService;
    let repository: jest.Mocked<BookRepository>;

    beforeEach(() => {
        repository = {
            getAllBooks: jest.fn(),
            getBook: jest.fn(),
            createBook: jest.fn(),
            updateBook: jest.fn(),
            deleteBook: jest.fn()
        } as unknown as jest.Mocked<BookRepository>;

        service = new BookService(repository);
    });

    it('deve retornar todos os livros', () => {
        const books: IBook[] = [
            {
                id: 1,
                name: 'Livro',
                author: 'Autor',
                url: 'url',
                description: 'description'
            }
        ];

        repository.getAllBooks.mockReturnValue(books);

        const result = service.getAllBooks();

        expect(result).toEqual(books);
        expect(repository.getAllBooks).toHaveBeenCalled();
    });

    it('deve lançar erro se não houver livros', () => {
        repository.getAllBooks.mockReturnValue([]);

        expect(() => service.getAllBooks())
            .toThrow('Nenhum livro foi encontrado');
    });

    it('deve retornar um livro por ID', () => {
        const book: IBook = {
            id: 1,
            name: 'Livro',
            author: 'Autor',
            url: 'url',
            description: 'description'
        };

        repository.getBook.mockReturnValue(book);

        const result = service.getBook(1);

        expect(result).toEqual(book);
    });

    it('deve lançar erro se livro não existir', () => {
        repository.getBook.mockReturnValue(undefined);

        expect(() => service.getBook(1))
            .toThrow(AppError);
    });

    it('deve criar um livro com sucesso', () => {
        const book: IBook = {
            id: 1,
            name: 'Livro',
            author: 'Autor',
            url: 'url',
            description: 'description'
        };

        repository.getBook.mockReturnValue(undefined);

        service.createBook(book);

        expect(repository.createBook).toHaveBeenCalledWith(book);
    });

    it('deve lançar erro se dados inválidos', () => {
        const book: IBook = {
            id: 1,
            name: '',
            author: '',
            url: 'url',
            description: 'description'
        };

        expect(() => service.createBook(book))
            .toThrow('Dados inválidos!');
    });

    it('deve lançar erro se livro já existir', () => {
        const book: IBook = {
            id: 1,
            name: 'Livro',
            author: 'Autor',
            url: 'url',
            description: 'description'
        };

        repository.getBook.mockReturnValue(book);

        expect(() => service.createBook(book))
            .toThrow('Esse livro já existe');
    });

    it('deve atualizar um livro', () => {
        const updated: IBook = {
            id: 1,
            name: 'Novo',
            author: 'Autor',
            url: 'url',
            description: 'description'
        };

        repository.updateBook.mockReturnValue(updated);

        const result = service.updateBook(1, { name: 'Novo' });

        expect(result).toEqual(updated);
    });

    it('deve lançar erro se livro não existir', () => {
        repository.updateBook.mockReturnValue(null);

        expect(() => service.updateBook(1, {}))
            .toThrow('Livro não encontrado!');
    });

    it('deve deletar um livro', () => {
        repository.deleteBook.mockReturnValue(true);

        const result = service.deleteBook(1);

        expect(result).toBe(true);
    });

    it('deve lançar erro se não encontrar livro', () => {
        repository.deleteBook.mockReturnValue(false);

        expect(() => service.deleteBook(1))
            .toThrow('Livro não encontrado para deletar');
    });
});