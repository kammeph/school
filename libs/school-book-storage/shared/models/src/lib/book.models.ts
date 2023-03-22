import { z } from 'zod';

export enum Subject {
  German = 'GERMAN',
  Mathematics = 'MATHEMATICS',
  English = 'ENGLISH',
  Music = 'MUSIC',
  GeneralEducation = 'GENERAL_EDUCATION',
  Religion = 'RELIGION',
}

export enum BookType {
  Book = 'BOOK',
  WorkBook = 'WORK_BOOK',
  DailyExerciseBook = 'DAILY_EXERCISE_BOOK',
  Attachments = 'ATTACHMENTS',
}

export const BookStorage = z.object({
  id: z.string(),
  name: z.string(),
  count: z.number(),
});

export type BookStorage = z.infer<typeof BookStorage>;

export const BookSchoolClass = z.object({
  id: z.string().optional(),
  name: z.string(),
  count: z.number(),
});

export type BookSchoolClass = z.infer<typeof BookSchoolClass>;

export const Book = z.object({
  id: z.string().optional(),
  isbn: z.string(),
  name: z.string(),
  description: z.string().optional(),
  totalCount: z.number().optional(),
  subject: z.nativeEnum(Subject).optional(),
  type: z.nativeEnum(BookType).optional(),
  grades: z.array(z.number()),
  storages: z.array(BookStorage).optional(),
  schoolClasses: z.array(BookSchoolClass).optional(),
});

export type Book = z.infer<typeof Book>;

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
