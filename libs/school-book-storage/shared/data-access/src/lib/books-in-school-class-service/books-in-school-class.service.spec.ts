import { TestBed } from '@angular/core/testing';

import { BooksInSchoolClassService } from './books-in-school-class.service';

describe('BooksInSchoolClassService', () => {
  let service: BooksInSchoolClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooksInSchoolClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
