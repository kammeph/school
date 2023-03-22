import { z } from 'zod';

export enum UserRole {
  Student = 'STUDENT',
  Teacher = 'TEACHER',
  Principal = 'PRINCIPAL',
  Warehouser = 'WAREHOUSER',
  Admin = 'ADMIN',
}

export enum Language {
  German = 'DE',
  English = 'EN',
}

export const User = z.object({
  uid: z.string().optional(),
  email: z.string(),
  displayName: z.string(),
  roles: z.array(z.nativeEnum(UserRole)),
  schoolId: z.string().optional(),
  canLogin: z.boolean(),
  language: z.nativeEnum(Language),
});

export type User = z.infer<typeof User>;
