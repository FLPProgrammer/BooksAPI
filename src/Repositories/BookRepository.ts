import { prisma } from '../Utils/Prisma'
import { Prisma, Book } from '../generated/prisma/client'
import { IBookRepository } from '../Interfaces/IBookRepository'


export class BookRepository
implements IBookRepository {


 async getAllBooks(): Promise<Book[]> {

   return prisma.book.findMany()

 }


 async getBook(
   id:number
 ): Promise<Book | null> {

   return prisma.book.findUnique({
      where:{ id }
   })

 }


 async createBook(
   data: Prisma.BookCreateInput
 ): Promise<Book> {

   return prisma.book.create({
      data
   })

 }


 async updateBook(
   id:number,
   data: Prisma.BookUpdateInput
 ): Promise<Book> {

   return prisma.book.update({
      where:{ id },
      data
   })

 }


 async deleteBook(
   id:number
 ): Promise<boolean> {

   await prisma.book.delete({
      where:{ id }
   })

   return true

 }

}