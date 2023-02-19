import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

import { AuthEffects } from './auth.effects';

import { RouterTestingModule } from '@angular/router/testing';
import { Action } from '@ngrx/store';

describe('AuthEffects', () => {
  let actions$: Observable<Action>;
  let effects: AuthEffects;

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
  });

  it('should be created', async () => {
    expect(effects).toBeTruthy();
  });
});
