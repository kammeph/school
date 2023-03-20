import { z } from 'zod';

export enum Subject {
  German = 'GERMAN',
  Mathematics = 'MATHEMATICS',
  English = 'ENGLISH',
  Music = 'MUSIC',
  GeneralEducation = 'GENERAL_EDUCATION',
  Religion = 'RELIGION',
}

// export const SUBJECT = {
//   German: 'GERMAN',
//   Mathematics: 'MATHEMATICS',
//   English: 'ENGLISH',
//   Music: 'MUSIC',
//   GeneralEducation: 'GENERAL_EDUCATION',
//   Religion: 'RELIGION',
// } as const;

// export const SubjectSchema = z.enum([
//   'GERMAN',
//   'MATHEMATICS',
//   'ENGLISH',
//   'MUSIC',
//   'GENERAL_EDUCATION',
//   'RELIGION',
// ]);

// export type Subject = z.infer<typeof SubjectSchema>;

export const BookStorage = z.object({
  id: z.string(),
  name: z.string(),
  count: z.number(),
});

export type BookStorage = z.infer<typeof BookStorage>;

export const Book = z.object({
  id: z.string().optional(),
  isbn: z.string(),
  name: z.string(),
  description: z.string().optional(),
  totalCount: z.number().optional(),
  subject: z.nativeEnum(Subject).optional(),
  grades: z.array(z.number()),
  storages: z.array(BookStorage).optional(),
});

export type Book = z.infer<typeof Book>;

export const BooksInStorage = z.object({
  storageId: z.string(),
  bookId: z.string(),
  count: z.number(),
});

export type BooksInStorage = z.infer<typeof BooksInStorage>;
