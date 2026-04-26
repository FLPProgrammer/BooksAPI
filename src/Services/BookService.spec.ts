import { BookService } from './BookService'
import { IBookRepository } from '../Interfaces/IBookRepository'
import { ICacheProvider } from '../Interfaces/ICacheProvider'
import { IBook } from '../Types/Book'
import { AppError } from '../Utils/AppError'

describe('BookService', () => {

  let service: BookService
  let repository: jest.Mocked<IBookRepository>
  let cache: jest.Mocked<ICacheProvider>

  beforeEach(() => {

    repository = {
      getAllBooks: jest.fn(),
      getBook: jest.fn(),
      createBook: jest.fn(),
      updateBook: jest.fn(),
      deleteBook: jest.fn()
    } as unknown as jest.Mocked<IBookRepository>


    cache = {
      get: jest.fn(),
      set: jest.fn(),
      del: jest.fn()
    } as unknown as jest.Mocked<ICacheProvider>


    cache.get.mockResolvedValue(null)
    cache.set.mockResolvedValue()
    cache.del.mockResolvedValue()


    service = new BookService(
      repository,
      cache
    )

  })


  it('deve retornar todos os livros', async () => {

    const books: IBook[] = [
      {
        id:1,
        name:'Livro',
        author:'Autor',
        url:'url',
        description:'description'
      }
    ]

    repository
      .getAllBooks
      .mockResolvedValue(books)

    const result =
      await service.getAllBooks()

    expect(result).toEqual(books)

    expect(
      repository.getAllBooks
    ).toHaveBeenCalled()

  })


  it(
   'deve lançar erro se não houver livros',
   async () => {

    repository
      .getAllBooks
      .mockResolvedValue([])

    await expect(
      service.getAllBooks()
    ).rejects.toThrow(
      'Nenhum livro foi encontrado'
    )

  })


  it(
   'deve retornar um livro por ID',
   async () => {

    const book: IBook = {
      id:1,
      name:'Livro',
      author:'Autor',
      url:'url',
      description:'description'
    }

    repository
      .getBook
      .mockResolvedValue(book)

    const result =
      await service.getBook(1)

    expect(result).toEqual(book)

  })


  it(
   'deve lançar erro se livro não existir',
   async () => {

    repository
      .getBook
      .mockResolvedValue(null)

    await expect(
      service.getBook(1)
    ).rejects.toThrow(AppError)

  })


  it(
   'deve criar um livro com sucesso',
   async () => {

    const book: IBook = {
      id:1,
      name:'Livro',
      author:'Autor',
      url:'url',
      description:'description'
    }

    repository
      .getBook
      .mockResolvedValue(null)

    repository
      .createBook
      .mockResolvedValue(book)

    await service.createBook(book)

    expect(
      repository.createBook
    ).toHaveBeenCalledWith(book)

  })


  it(
   'deve lançar erro se dados inválidos',
   async () => {

    const book: IBook = {
      id:1,
      name:'',
      author:'',
      url:'url',
      description:'description'
    }

    await expect(
      service.createBook(book)
    ).rejects.toThrow(
      'Dados inválidos!'
    )

  })


  it(
   'deve lançar erro se livro já existe',
   async () => {

    const book: IBook = {
      id:1,
      name:'Livro',
      author:'Autor',
      url:'url',
      description:'description'
    }

    repository
      .getBook
      .mockResolvedValue(book)

    await expect(
      service.createBook(book)
    ).rejects.toThrow(
      'Esse livro já existe'
    )

  })


  it(
   'deve atualizar um livro',
   async () => {

    const updated: IBook = {
      id:1,
      name:'Novo',
      author:'Autor',
      url:'url',
      description:'description'
    }

    repository
      .updateBook
      .mockResolvedValue(updated)

    const result =
      await service.updateBook(
        1,
        { name:'Novo' }
      )

    expect(result).toEqual(updated)

  })


it(
 'deve lançar erro se livro não existir',
 async () => {

  repository
    .getBook
    .mockResolvedValue(null)

  await expect(
    service.getBook(1)
  ).rejects.toThrow(AppError)

})


  it(
   'deve deletar um livro',
   async () => {

    repository
      .deleteBook
      .mockResolvedValue(true)

    const result =
      await service.deleteBook(1)

    expect(result).toBe(true)

  })


  it(
   'deve lançar erro se não encontrar livro',
   async () => {

    repository
      .deleteBook
      .mockResolvedValue(false)

    await expect(
      service.deleteBook(1)
    ).rejects.toThrow(
      'Livro não encontrado para deletar'
    )

  })


  it(
   'deve retornar do cache sem consultar repository',
   async () => {

    const book = {
      id:1,
      name:'Cache',
      author:'Autor',
      url: 'Url',
      description: 'Description'
    }

    cache.get.mockResolvedValue(
      JSON.stringify(book)
    )

    await service.getBook(1)

    expect(
      repository.getBook
    ).not.toHaveBeenCalled()

  })

})