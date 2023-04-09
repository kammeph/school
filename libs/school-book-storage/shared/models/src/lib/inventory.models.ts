import { z } from 'zod';

export const Inventory = z.object({
  id: z.string().optional(),
  storageId: z.string(),
  bookId: z.string(),
  count: z.number(),
  createdBy: z.string(),
  createdAt: z.number(),
  comment: z.string().optional(),
});

export type Inventory = z.infer<typeof Inventory>;

export const BooksInStorage = z.object({
  storageId: z.string(),
  bookId: z.string(),
  count: z.number(),
});

export type BooksInStorage = z.infer<typeof BooksInStorage>;

export const BooksInSchoolClass = z.object({
  schoolClassId: z.string(),
  bookId: z.string(),
  count: z.number(),
});

export type BooksInSchoolClass = z.infer<typeof BooksInSchoolClass>;

export const DamagedBooks = z.object({
  schoolClassId: z.string(),
  bookId: z.string(),
  count: z.number(),
});

export type DamagedBooks = z.infer<typeof DamagedBooks>;
