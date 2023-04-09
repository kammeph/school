import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolClassManageDamagedBooksModalComponent } from './school-class-manage-damaged-books-modal.component';

describe('SchoolClassManageDamagedBooksModalComponent', () => {
  let component: SchoolClassManageDamagedBooksModalComponent;
  let fixture: ComponentFixture<SchoolClassManageDamagedBooksModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SchoolClassManageDamagedBooksModalComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(
      SchoolClassManageDamagedBooksModalComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
