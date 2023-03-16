export enum Subject {
  German = 'GERMAN',
  Mathematics = 'MATHEMATICS',
  English = 'ENGLISH',
  Music = 'MUSIC',
  GeneralEducation = 'GENERAL_EDUCATION',
  Religion = 'RELIGION',
}

export type BooksInStorage = {
  id?: string;
  storageId: string;
  bookId: string;
  count: number;
};

export type BookStorage = {
  id: string;
  name: string;
  count: number;
};

export type Book = {
  id?: string;
  isbn: string;
  name: string;
  description?: string;
  subject?: Subject;
  grades: number[];
  storages?: BookStorage[];
};
