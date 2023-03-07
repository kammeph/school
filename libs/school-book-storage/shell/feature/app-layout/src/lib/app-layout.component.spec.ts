import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { provideMockStore } from '@ngrx/store/testing';

import { AppLayoutComponent } from './app-layout.component';

import { RouterTestingModule } from '@angular/router/testing';
import { selectDisplayName } from '@school-book-storage/auth/data-access';
import { TranslateModule } from '@ngx-translate/core';

describe('LayoutComponent', () => {
  let component: AppLayoutComponent;
  let fixture: ComponentFixture<AppLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppLayoutComponent],
      imports: [IonicModule, RouterTestingModule, TranslateModule.forRoot()],
      providers: [
        provideMockStore({
          selectors: [{ selector: selectDisplayName, value: 'test' }],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
