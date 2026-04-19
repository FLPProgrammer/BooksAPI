import { Request, Response } from 'express';
import { BookService } from "../Services/BookService";


export class BookController {
    
    constructor(private bookService: BookService) {}


    getAllBooks(request: Request, response: Response) {

      try {
        const books = this.bookService.getAllBooks();

        return response.status(200).json({data: books})

      } catch(error: any) {
        return response.status(400).json({message: error.message})
      }


    }

    getBook(request: Request, response: Response) {
        try {
            const id  = Number(request.params.id);
            const book = this.bookService.getBook(id)

            return response.status(200).json(book);
        } catch(error: any) {
            response.status(400).json({message: error.message})
        }
    }

    createBook(request: Request, response: Response) {
        try {
            const book = request.body;

            const createdBook = this.bookService.createBook(book);

            return response.status(201).json({data: createdBook});
        } catch(error: any) {
            return response.status(400).json({message: error.message});
        }
    }


    updateBook(request: Request, response: Response) {
        try {
            const id = Number(request.params.id);
            const data = request.body;

            const updatedBook = this.bookService.updateBook(id, data);

            return response.status(200).json({
                data: updatedBook
            })           
        } catch(error: any) {
            return response.status(400).json({
                message: error.message
            })
        }
    }


    deleteBook(request: Request, response: Response) {
        try {
            const id = Number(request.params.id);

            const deletedBook = this.bookService.deleteBook(id);

            return response.status(200).json({message: 'Livro deletado com sucesso'})
        } catch(error: any) {
            return response.status(400).json({message: error.message});
        }
    }


}