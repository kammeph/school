import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolClassFormComponent } from './school-class-form.component';

describe('SchoolClassFormComponent', () => {
  let component: SchoolClassFormComponent;
  let fixture: ComponentFixture<SchoolClassFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolClassFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SchoolClassFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
