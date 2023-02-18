import { AuthState } from './auth.reducer';
import * as AuthSelectors from './auth.selectors';

describe('AuthSelectors', () => {
  const initialState: AuthState = {
    user: {
      uid: '123',
      email: 'test@test.com',
      displayName: 'Test User',
      roles: [],
      schoolId: '456',
    },
    isLoggedIn: false,
  };

  it('should select is logged in', () => {
    expect(AuthSelectors.selectIsLoggedIn.projector(initialState)).toEqual(
      false
    );
  });

  it('should select uid', () => {
    expect(AuthSelectors.selectUid.projector(initialState)).toEqual('123');
  });

  it('should select school id', () => {
    expect(AuthSelectors.selectSchoolId.projector(initialState)).toEqual('456');
  });

  it('should select display name', () => {
    expect(AuthSelectors.selectDisplayName.projector(initialState)).toEqual(
      'Test User'
    );
  });

  it('should select error', () => {
    expect(
      AuthSelectors.selectAuthError.projector({
        ...initialState,
        error: 'Error',
      })
    ).toEqual('Error');
  });
});
