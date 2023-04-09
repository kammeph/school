import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountableSelectModalComponent } from './countable-select-modal.component';

describe('CountableSelectModalComponent', () => {
  let component: CountableSelectModalComponent;
  let fixture: ComponentFixture<CountableSelectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountableSelectModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CountableSelectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
