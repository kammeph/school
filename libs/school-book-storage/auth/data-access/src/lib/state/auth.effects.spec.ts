import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';

import { AuthEffects } from './auth.effects';
import { AuthActions } from './auth.actions';

import { RouterTestingModule } from '@angular/router/testing';
import { Action } from '@ngrx/store';

describe('AuthEffects', () => {
  let actions$: Observable<Action>;
  let effects: AuthEffects;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        {
          provide: AuthService,
          useValue: { login: jest.fn(), register: jest.fn() },
        },
      ],
    });

    effects = TestBed.inject(AuthEffects);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should be able to login', (done) => {
    const credentials = { email: 'test@test.com', password: '123456' };
    const loginRespone = {
      uid: '123',
      email: 'test@test.com',
      displayName: 'Test User',
    };
    const action = AuthActions.login(credentials);
    const completion = AuthActions.loginSuccess({ user: loginRespone });
    actions$ = of(action);
    (authService.login as jest.Mock).mockReturnValue(of(loginRespone));

    effects.login$.subscribe((result) => {
      expect(result).toEqual(completion);
      done();
    });
  });

  it('should not be able to login with invalid credentials', (done) => {
    const credentials = { email: 'test@test.com', password: '123456' };
    const loginRespone = 'Invalid email or password';
    const action = AuthActions.login(credentials);
    const completion = AuthActions.loginFailure({ error: loginRespone });
    actions$ = of(action);
    (authService.login as jest.Mock).mockReturnValue(
      throwError(() => new Error(loginRespone))
    );

    effects.login$.subscribe((result) => {
      expect(result).toEqual(completion);
      done();
    });
  });

  it('should be able to register', (done) => {
    const credentials = {
      displayName: 'Test User',
      email: 'test@test.com',
      password: '123456',
    };
    const loginRespone = {
      uid: '123',
      email: 'test@test.com',
      displayName: 'Test User',
    };

    const action = AuthActions.register(credentials);
    const completion = AuthActions.loginSuccess({ user: loginRespone });
    actions$ = of(action);
    (authService.register as jest.Mock).mockReturnValue(of(loginRespone));

    effects.register$.subscribe((result) => {
      expect(result).toEqual(completion);
      done();
    });
  });

  it('should not be able to register with existing email', (done) => {
    const credentials = {
      displayName: 'Test User',
      email: 'existing@email.com',
      password: '123456',
    };
    const loginRespone = 'Email already exists';
    const action = AuthActions.register(credentials);
    const completion = AuthActions.registerFailure({ error: loginRespone });
    actions$ = of(action);
    (authService.register as jest.Mock).mockReturnValue(
      throwError(() => new Error(loginRespone))
    );

    effects.register$.subscribe((result) => {
      expect(result).toEqual(completion);
      done();
    });
  });
});
