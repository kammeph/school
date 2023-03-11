export interface User {
  uid?: string;
  email: string;
  displayName: string;
  roles: string[];
  schoolId?: string;
  canLogin: boolean;
}

export enum UserRole {
  Student = 'STUDENT',
  Teacher = 'TEACHER',
  Principal = 'PRINCIPAL',
  Warehouser = 'WAREHOUSER',
  Admin = 'ADMIN',
}
