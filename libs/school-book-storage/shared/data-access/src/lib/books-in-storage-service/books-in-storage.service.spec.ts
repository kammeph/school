import { TestBed } from '@angular/core/testing';

import { BooksInStorageService } from './books-in-storage.service';

describe('BooksInStorageService', () => {
  let service: BooksInStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooksInStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
