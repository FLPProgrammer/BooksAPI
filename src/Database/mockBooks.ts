import { IBook } from '../Types/Book'

export const mockBooks: IBook[] = [
    {
        id: 1,
        name: "Clean Code",
        author: "Robert C. Martin",
        url: "https://example.com/clean-code",
        description: "Um guia clássico sobre boas práticas de programação e escrita de código limpo."
    },
    {
        id: 2,
        name: "The Pragmatic Programmer",
        author: "Andrew Hunt e David Thomas",
        url: "https://example.com/pragmatic-programmer",
        description: "Livro essencial sobre mentalidade e boas práticas no desenvolvimento de software."
    },
    {
        id: 3,
        name: "Design Patterns",
        author: "Erich Gamma, Richard Helm, Ralph Johnson e John Vlissides",
        url: "https://example.com/design-patterns",
        description: "Catálogo clássico de padrões de projeto para resolver problemas recorrentes."
    },
    {
        id: 4,
        name: "Refactoring",
        author: "Martin Fowler",
        url: "https://example.com/refactoring",
        description: "Explica como melhorar a estrutura de código existente sem alterar seu comportamento."
    },
    {
        id: 5,
        name: "You Don't Know JS Yet",
        author: "Kyle Simpson",
        url: "https://example.com/ydkjs",
        description: "Série focada em aprofundar o entendimento da linguagem JavaScript."
    }
];