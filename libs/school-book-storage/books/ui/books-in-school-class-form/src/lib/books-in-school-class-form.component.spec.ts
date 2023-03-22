import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksUiBooksInSchoolClassFormComponent } from './books-in-school-class-form.component';

describe('BooksUiBooksInSchoolClassFormComponent', () => {
  let component: BooksUiBooksInSchoolClassFormComponent;
  let fixture: ComponentFixture<BooksUiBooksInSchoolClassFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksUiBooksInSchoolClassFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BooksUiBooksInSchoolClassFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
