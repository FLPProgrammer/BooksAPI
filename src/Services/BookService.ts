import { BookRepository } from '../Repositories/BookRepository';
import { IBook } from '../Types/Book';

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
            throw new Error('Esse livro não foi encontrado');
        }

        return book;
}

    createBook(book: IBook) {
        if(!book.name || !book.author) {
            throw new Error('Dados inválidos!')
        }

        const existing = this.bookRepository.getBook(book.id);

        if(existing) {
            throw new Error('Esse livro já existe')
        }
        return this.bookRepository.createBook(book)
    }

    updateBook(id: number, data: Partial<IBook>): IBook | null {
        const updated = this.bookRepository.updateBook(id, data);

        if(!updated) {
            throw new Error('Livro não encontrado!');
        }

        return updated;
    }

    deleteBook(id: number): boolean {
        const deleted = this.bookRepository.deleteBook(id);

        if(!deleted) {
            throw new Error('Livro não encontrado para deletar');
        }

        return true;
    }
}