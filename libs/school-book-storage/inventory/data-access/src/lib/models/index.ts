export type Inventory = {
  id?: string;
  storageId: string;
  bookId: string;
  count: number;
  comment?: string;
};

export type BooksInStorage = {
  storageId: string;
  bookId: string;
  count: number;
};
