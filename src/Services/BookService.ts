import { BookRepository } from '../Repositories/BookRepository';
import { IBook } from '../Types/Book';
import { AppError } from '../Utils/AppError';
import { redisClient } from '../Utils/Redis';

export class BookService {
    constructor(private bookRepository: BookRepository) {}

   
    private readonly CACHE_KEY_ALL = 'books:all';
    private getCacheKeyItem(id: number) { return `book:${id}`; }

    async getAllBooks(): Promise<IBook[]> {
       
        const cached = await redisClient.get(this.CACHE_KEY_ALL);
        if (cached) return JSON.parse(cached);

       
        const books = this.bookRepository.getAllBooks();
        
        if (!books.length) {
            throw new AppError('Nenhum livro foi encontrado');
        }

       
        await redisClient.set(this.CACHE_KEY_ALL, JSON.stringify(books), { EX: 3600 });

        return books;
    }

    async getBook(id: number): Promise<IBook> {
        const cacheKey = this.getCacheKeyItem(id);

        
        const cached = await redisClient.get(cacheKey);
        if (cached) return JSON.parse(cached);

        const book = this.bookRepository.getBook(id);

        if (!book) {
            throw new AppError('Esse livro não foi encontrado');
        }

        
        await redisClient.set(cacheKey, JSON.stringify(book), { EX: 3600 });

        return book;
    }

    async createBook(book: IBook): Promise<IBook> {
        if (!book.name || !book.author) {
            throw new AppError('Dados inválidos!');
        }

        const existing = this.bookRepository.getBook(book.id);
        if (existing) {
            throw new AppError('Esse livro já existe');
        }

        const newBook = this.bookRepository.createBook(book);

        await redisClient.del(this.CACHE_KEY_ALL);

        return newBook;
    }

    async updateBook(id: number, data: Partial<IBook>): Promise<IBook> {
        const updated = this.bookRepository.updateBook(id, data);

        if (!updated) {
            throw new AppError('Livro não encontrado!');
        }

        await Promise.all([
            redisClient.del(this.CACHE_KEY_ALL),
            redisClient.del(this.getCacheKeyItem(id))
        ]);

        return updated;
    }

    async deleteBook(id: number): Promise<boolean> {
        const deleted = this.bookRepository.deleteBook(id);

        if (!deleted) {
            throw new AppError('Livro não encontrado para deletar');
        }


        await Promise.all([
            redisClient.del(this.CACHE_KEY_ALL),
            redisClient.del(this.getCacheKeyItem(id))
        ]);

        return true;
    }
}