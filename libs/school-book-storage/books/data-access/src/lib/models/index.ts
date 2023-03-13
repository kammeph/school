export enum Subject {
  German = 'GERMAN',
  Mathematics = 'MATHEMATICS',
  English = 'ENGLISH',
  Music = 'MUSIC',
  GeneralEducation = 'GENERAL_EDUCATION',
  Religion = 'RELIGION',
}

export interface Book {
  id?: string;
  isbn: string;
  name: string;
  description?: string;
  subject?: Subject;
  grades: number[];
}
