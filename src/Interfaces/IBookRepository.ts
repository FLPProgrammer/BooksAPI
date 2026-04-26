import { IBook } from '../Types/Book'

export interface IBookRepository {

 getAllBooks(): Promise<IBook[]>

 getBook(
   id:number
 ): Promise<IBook | null>

 createBook(
   book: IBook
 ): Promise<IBook>

 updateBook(
   id:number,
   data: Partial<IBook>
 ): Promise<IBook | null>

 deleteBook(
   id:number
 ): Promise<boolean>

}