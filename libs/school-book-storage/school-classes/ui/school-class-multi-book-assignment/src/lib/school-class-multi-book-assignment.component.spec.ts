import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolClassMultiBookAssignmentComponent } from './school-class-multi-book-assignment.component';

describe('SchoolClassMultiBookAssignmentComponent', () => {
  let component: SchoolClassMultiBookAssignmentComponent;
  let fixture: ComponentFixture<SchoolClassMultiBookAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolClassMultiBookAssignmentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SchoolClassMultiBookAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
