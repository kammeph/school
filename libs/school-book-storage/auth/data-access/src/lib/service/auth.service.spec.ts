import { TestBed } from '@angular/core/testing';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
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
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    updateProfile: jest.fn(),
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
    const loginRespone = {
      uid: '123',
      email: 'test@test.com',
      displayName: 'Test User',
      roles: [],
    };
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue(
      userCredentials
    );

    const login$ = service.login(email, password);
    expect(await firstValueFrom(login$)).toEqual(loginRespone);
  });

  it('should not be able to login with invalid credentials', async () => {
    const email = 'test@test.de';
    const password = '123456';
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValue(
      new Error('Invalid email or password')
    );

    const login$ = service.login(email, password);
    expect(firstValueFrom(login$)).rejects.toThrow('Invalid email or password');
  });

  it('should be able to register', async () => {
    const displayName = 'Test User';
    const email = 'test@test.com';
    const password = '123456';
    const registerRespone = {
      uid: '123',
      email: 'test@test.com',
      displayName: 'Test User',
      roles: [],
    };
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: registerRespone,
    });

    const register$ = service.register(displayName, email, password);
    expect(await firstValueFrom(register$)).toEqual(registerRespone);
  });

  it('should not be able to register with existing email', async () => {
    const displayName = 'Test User';
    const email = 'existing@email.com';
    const password = '123456';
    (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue(
      new Error('Email already in use')
    );

    const register$ = service.register(displayName, email, password);
    expect(firstValueFrom(register$)).rejects.toThrow('Email already in use');
  });
});
