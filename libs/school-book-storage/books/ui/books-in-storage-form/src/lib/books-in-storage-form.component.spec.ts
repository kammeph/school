import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksInStorageFormComponent } from './books-in-storage-form.component';

describe('SchoolBookStorageBooksUiBooksInStorageFormComponent', () => {
  let component: BooksInStorageFormComponent;
  let fixture: ComponentFixture<BooksInStorageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksInStorageFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BooksInStorageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
