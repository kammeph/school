import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolClassDetailsComponent } from './school-class-details.component';

describe('SchoolClassDetailsComponent', () => {
  let component: SchoolClassDetailsComponent;
  let fixture: ComponentFixture<SchoolClassDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolClassDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SchoolClassDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
