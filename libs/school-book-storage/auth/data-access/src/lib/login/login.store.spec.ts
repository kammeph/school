import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { combineLatest, of, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { LoginStore } from './login.store';

describe('LoginStore', () => {
  let store: LoginStore;
  let authService: AuthService;
  let credentials: { email: string; password: string };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        LoginStore,
        provideMockStore(),
        {
          provide: AuthService,
          useValue: { login: jest.fn() },
        },
      ],
    });
    store = TestBed.inject(LoginStore);
    authService = TestBed.inject(AuthService);
    credentials = {
      email: 'test@test.com',
      password: 'password',
    };
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should be pending when login is called', (done) => {
    store.login(credentials);
    store.pending$.subscribe((pending) => {
      expect(pending).toBeTruthy();
      done();
    });
  });

  it('should be able to login', (done) => {
    (authService.login as jest.Mock).mockReturnValue(
      of({
        uid: '123',
        email: 'test@test.com',
        displayName: 'Test User',
      })
    );
    store.login(credentials);
    combineLatest([store.error$, store.pending$]).subscribe(
      ([error, pending]) => {
        expect(error).toBeNull();
        expect(pending).toBeFalsy();
        done();
      }
    );
  });

  it('should error when login returns null user', (done) => {
    (authService.login as jest.Mock).mockReturnValue(of(null));
    store.login(credentials);
    combineLatest([store.error$, store.pending$]).subscribe(
      ([error, pending]) => {
        expect(error).toBeTruthy();
        expect(pending).toBeFalsy();
        done();
      }
    );
  });

  it('should not be able to login with invalid credentials', (done) => {
    (authService.login as jest.Mock).mockReturnValue(
      throwError(() => new Error('Invalid email or password'))
    );
    store.login(credentials);
    combineLatest([store.error$, store.pending$]).subscribe(
      ([error, pending]) => {
        expect(error).toBe('Invalid email or password');
        expect(pending).toBeFalsy();
        done();
      }
    );
  });
});
