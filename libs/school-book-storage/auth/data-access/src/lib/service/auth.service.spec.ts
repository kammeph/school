import { TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { firstValueFrom } from 'rxjs';

import { AuthService } from './auth.service';

const userCredentials = {
  user: {
    uid: '123',
    email: 'test@test.com',
    displayName: 'Test User',
  },
};

jest.mock('@angular/fire/auth', () => {
  const original = jest.requireActual('@angular/fire/auth');
  return {
    ...original,
    signInWithEmailAndPassword: jest.fn(
      (auth: Auth, email: string, password: string) => {
        if (email === 'test@test.com' && password === '123456') {
          return Promise.resolve(userCredentials);
        } else {
          return Promise.reject(new Error('Invalid email or password'));
        }
      }
    ),
  };
});

describe('AuthService', () => {
  let service: AuthService;
  let authSpy: jest.Mocked<Auth>;

  beforeEach(() => {
    authSpy = {} as jest.Mocked<Auth>;
    TestBed.configureTestingModule({
      providers: [{ provide: Auth, useValue: authSpy }],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to login', async () => {
    const email = 'test@test.com';
    const password = '123456';

    const login$ = service.login(email, password);
    const user = await firstValueFrom(login$);
    expect(user?.email).toEqual(email);
    expect(user?.displayName).toEqual('Test User');
  });

  it('should not be able to login with invalid credentials', async () => {
    const email = 'test@test.de';
    const password = '123456';

    const login$ = service.login(email, password);
    expect(firstValueFrom(login$)).rejects.toThrow('Invalid email or password');
  });
});
