import { TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { SchoolBookStorageShellModule } from './school-book-storage-shell-feature.module';

describe('SchoolBookStorageShellFeatureModule', () => {
  beforeEach(() => {
    const authSpy = {} as jest.Mocked<Auth>;
    TestBed.configureTestingModule({
      imports: [SchoolBookStorageShellModule],
      providers: [{ provide: Auth, useValue: authSpy }],
    });
  });

  it('should create', () => {
    const module = TestBed.inject(SchoolBookStorageShellModule);
    expect(module).toBeTruthy();
  });
});
