import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { combineLatest, of, throwError } from 'rxjs';
import { AuthService } from '../service';
import { RegisterStore } from './register.store';

describe('RegisterStore', () => {
  let store: RegisterStore;
  let authService: AuthService;
  let registerData: { displayName: string; email: string; password: string };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        RegisterStore,
        provideMockStore(),
        { provide: AuthService, useValue: { register: jest.fn() } },
      ],
    });
    store = TestBed.inject(RegisterStore);
    authService = TestBed.inject(AuthService);
    registerData = {
      displayName: 'Test User',
      email: 'test@test.de',
      password: 'password',
    };
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should be pending when register is called', (done) => {
    store.register(registerData);
    store.pending$.subscribe((pending) => {
      expect(pending).toBeTruthy();
      done();
    });
  });

  it('should be able to register', (done) => {
    (authService.register as jest.Mock).mockReturnValue(
      of({ displayName: 'Test User', email: 'test@test.de', uid: '123' })
    );
    store.register(registerData);
    combineLatest([store.error$, store.pending$]).subscribe(
      ([error, pending]) => {
        expect(error).toBeNull();
        expect(pending).toBeFalsy();
        done();
      }
    );
  });

  it('should error when register returns null user', (done) => {
    (authService.register as jest.Mock).mockReturnValue(of(null));
    store.register(registerData);
    combineLatest([store.error$, store.pending$]).subscribe(
      ([error, pending]) => {
        expect(error).toBeTruthy();
        expect(pending).toBeFalsy();
        done();
      }
    );
  });

  it('should not be able to register with invalid credentials', (done) => {
    (authService.register as jest.Mock).mockReturnValue(
      throwError(() => new Error('Invalid credentials'))
    );
    store.register(registerData);
    combineLatest([store.error$, store.pending$]).subscribe(
      ([error, pending]) => {
        expect(error).toBeTruthy();
        expect(pending).toBeFalsy();
        done();
      }
    );
  });
});
