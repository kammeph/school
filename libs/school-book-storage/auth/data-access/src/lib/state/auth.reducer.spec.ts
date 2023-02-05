import { authReducer, initialState } from './auth.reducer';
import { AuthActions } from './auth.actions';

describe('AuthReducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(initialState, { type: 'Unknown' })).toEqual(
      initialState
    );
  });

  it('should return the state with user on login', () => {
    const user = {
      uid: '123',
      email: 'test@test.com',
      displayName: 'Test User',
      roles: [],
      schoolId: '456',
    };

    expect(
      authReducer(initialState, AuthActions.loginSuccess({ user }))
    ).toEqual({
      ...initialState,
      user,
      isLoggedIn: true,
    });
  });

  it('should return the initial state on logout', () => {
    expect(authReducer(initialState, AuthActions.logoutSuccess())).toEqual(
      initialState
    );
  });
});
