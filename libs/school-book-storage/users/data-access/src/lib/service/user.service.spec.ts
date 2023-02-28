import { TestBed } from '@angular/core/testing';
import {
  collectionData,
  docData,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';
import { User } from '@school-book-storage/auth/data-access';
import { of, Subject } from 'rxjs';

import { UserService } from './user.service';

jest.mock('@angular/fire/firestore', () => {
  const original = jest.requireActual('@angular/fire/firestore');

  return {
    ...original,
    collection: jest.fn(),
    collectionData: jest.fn(),
    doc: jest.fn(),
    docData: jest.fn(),
    updateDoc: jest.fn(),
  };
});

describe('UserService', () => {
  let service: UserService;
  let firestoreSpy: jest.Mocked<Firestore>;

  const allUsers = [
    {
      uid: '123',
      displayName: 'Test User',
      email: 'test@test.com',
      roles: [],
      schoolId: '456',
    },
    {
      uid: '789',
      displayName: 'Test User 2',
      email: 'test2@test.com',
      roles: [],
      schoolId: '456',
    },
  ] as User[];

  beforeEach(() => {
    firestoreSpy = {} as jest.Mocked<Firestore>;
    TestBed.configureTestingModule({
      providers: [UserService, { provide: Firestore, useValue: firestoreSpy }],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all user', (done) => {
    (collectionData as jest.Mock).mockReturnValue(of(allUsers));
    service.getAll().subscribe((users) => {
      expect(users).toEqual(allUsers);
      done();
    });
  });

  it('should return a user by id', (done) => {
    (docData as jest.Mock).mockReturnValue(of(allUsers[0]));
    service.getById('123').subscribe((user) => {
      expect(user).toEqual(user);
      done();
    });
  });

  it('should update a user', (done) => {
    const updatedUsers = [
      {
        uid: '123',
        displayName: 'Test User 3',
        email: 'test@test.com',
        roles: [],
        schoolId: '456',
      },
      {
        uid: '789',
        displayName: 'Test User 2',
        email: 'test2@test.com',
        roles: [],
        schoolId: '456',
      },
    ] as User[];
    const updateSubject = new Subject<User[]>();
    (collectionData as jest.Mock).mockReturnValue(updateSubject);
    service.getAll().subscribe((users) => {
      users.forEach((u) => {
        expect(updatedUsers).toContainEqual(u);
      });
      done();
    });
    (updateDoc as jest.Mock).mockReturnValue(of({}));
    const update = { ...allUsers[0], displayName: 'Test User 3' } as User;
    service.update(update).subscribe(() => {
      updateSubject.next([
        ...allUsers.filter((u) => u.uid !== update.uid),
        update,
      ]);
    });
  });
});
