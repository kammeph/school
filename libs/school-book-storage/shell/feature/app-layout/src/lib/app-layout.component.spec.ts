import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { provideMockStore } from '@ngrx/store/testing';

import { LayoutComponent } from './app-layout.component';

import { RouterTestingModule } from '@angular/router/testing';
import { selectDisplayName } from '@school-book-storage/auth/data-access';
import { NavigationModule } from '@school-book-storage/shell/navigation';
import { TranslateModule } from '@ngx-translate/core';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutComponent],
      imports: [
        IonicModule,
        RouterTestingModule,
        NavigationModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        provideMockStore({
          selectors: [{ selector: selectDisplayName, value: 'test' }],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
