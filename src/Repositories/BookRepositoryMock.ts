import { IBook } from '../Types/Book'
import { mockBooks } from '../Database/mockBooks'

export class BookRepositoryMock {
  private books: IBook[]

  constructor() {
    this.books = [...mockBooks]
  }

  getAllBooks(): IBook[] {
    return this.books
  }

  getBook(id: number): IBook | undefined {
    return this.books.find(book => book.id === id)
  }

  createBook(book: IBook): IBook {
    this.books.push(book)
    return book
  }

  updateBook(
    id: number,
    updatedData: Partial<IBook>
  ): IBook | null {

    const book = this.getBook(id)

    if (!book) return null

    Object.assign(book, updatedData)

    return book
  }

  deleteBook(id: number): boolean {
    const index = this.books.findIndex(
      book => book.id === id
    )

    if (index === -1) return false

    this.books.splice(index, 1)

    return true
  }
}