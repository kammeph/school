import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolBookStorageSchoolClassesUiSchoolClassDamagedBookListComponent } from './school-class-damaged-book-list.component';

describe('SchoolBookStorageSchoolClassesUiSchoolClassDamagedBookListComponent', () => {
  let component: SchoolBookStorageSchoolClassesUiSchoolClassDamagedBookListComponent;
  let fixture: ComponentFixture<SchoolBookStorageSchoolClassesUiSchoolClassDamagedBookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SchoolBookStorageSchoolClassesUiSchoolClassDamagedBookListComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(
      SchoolBookStorageSchoolClassesUiSchoolClassDamagedBookListComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
