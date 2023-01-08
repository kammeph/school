export interface User {
  uid: string;
  email: string;
  displayName: string;
  roles: string[];
  schoolId?: string;
}
