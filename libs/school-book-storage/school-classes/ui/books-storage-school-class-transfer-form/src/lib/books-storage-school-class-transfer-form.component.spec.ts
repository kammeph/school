import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolBookStorageSchoolClassesUiBooksStorageSchoolClassTransferFormComponent } from './school-book-storage-school-classes-ui-books-storage-school-class-transfer-form.component';

describe('SchoolBookStorageSchoolClassesUiBooksStorageSchoolClassTransferFormComponent', () => {
  let component: SchoolBookStorageSchoolClassesUiBooksStorageSchoolClassTransferFormComponent;
  let fixture: ComponentFixture<SchoolBookStorageSchoolClassesUiBooksStorageSchoolClassTransferFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SchoolBookStorageSchoolClassesUiBooksStorageSchoolClassTransferFormComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(
      SchoolBookStorageSchoolClassesUiBooksStorageSchoolClassTransferFormComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
