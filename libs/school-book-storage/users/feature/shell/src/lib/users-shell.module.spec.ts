import { TestBed } from '@angular/core/testing';
import { UsersShellModule } from './users-shell.module';

describe('SchoolBookStorageUsersFeatureShellModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UsersShellModule],
    }).compileComponents();
  });

  it('should have a module definition', () => {
    expect(UsersShellModule).toBeDefined();
  });
});
