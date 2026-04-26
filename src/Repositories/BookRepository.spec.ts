import { BookRepositoryMock } from './BookRepositoryMock';

describe('BookRepository', () => {
    let repository: BookRepositoryMock;

    beforeEach(() => {
        repository = new BookRepositoryMock()
    });

    it('deve retornar todos os livros do mock inicial', () => {
        const books = repository.getAllBooks();
        expect(Array.isArray(books)).toBe(true);
        expect(books.length).toBeGreaterThan(0);
    })

    it('deve encontrar um livro por ID', () => {
        const book = repository.getBook(1);
        expect(book).toBeDefined();
        expect(book?.id).toBe(1);
    });

    it('deve retornar undefined para um ID inexistente', () => {
        const book = repository.getBook(999)
        expect(book).toBeUndefined();
    })

    it('deve deletar um livro com sucesso', () => {
        const result = repository.deleteBook(1);
        expect(result).toBe(true);
    });
});