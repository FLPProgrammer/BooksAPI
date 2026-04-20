import { BookRepository } from '../Repositories/BookRepository';
import { IBook } from '../Types/Book';
import { AppError } from '../Utils/AppError';

export class BookService {

    constructor(private bookRepository: BookRepository) {}

    getAllBooks(): IBook[] {
        const books = this.bookRepository.getAllBooks();
        
        if(!books.length) {
            throw new Error('Nenhum livro foi encontrado')
        }

        return books
    }

    getBook(id: number): IBook | undefined {
        const book = this.bookRepository.getBook(id);

        if(!book) {
            throw new AppError('Esse livro não foi encontrado');
        }

        return book;
}

    createBook(book: IBook) {
        if(!book.name || !book.author) {
            throw new AppError('Dados inválidos!')
        }

        const existing = this.bookRepository.getBook(book.id);

        if(existing) {
            throw new AppError('Esse livro já existe')
        }
        return this.bookRepository.createBook(book)
    }

    updateBook(id: number, data: Partial<IBook>): IBook | null {
        const updated = this.bookRepository.updateBook(id, data);

        if(!updated) {
            throw new AppError('Livro não encontrado!');
        }

        return updated;
    }

    deleteBook(id: number): boolean {
        const deleted = this.bookRepository.deleteBook(id);

        if(!deleted) {
            throw new AppError('Livro não encontrado para deletar');
        }

        return true;
    }
}