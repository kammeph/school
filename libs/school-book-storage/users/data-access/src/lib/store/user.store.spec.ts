import { TestBed } from '@angular/core/testing';
import { UserService } from '../service/user.service';

import { UserStore } from './user.store';

describe('UserStore', () => {
  let store: UserStore;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserStore, { provide: UserService, useValue: {} }],
    });

    store = TestBed.inject(UserStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });
});
