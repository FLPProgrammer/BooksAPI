import { z } from "zod";

export const getBookSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
});

export const createBookSchema = z.object({
  body: z.object({
    name: z.string().min(3),
    author: z.string().min(3),
    url: z.string().url(),
    description: z.string().min(10),
  }),
});

export const updateBookSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
  body: z.object({
    name: z.string().min(3).optional(),
    author: z.string().min(3).optional(),
    url: z.string().url().optional(),
    description: z.string().min(10).optional(),
  }),
});