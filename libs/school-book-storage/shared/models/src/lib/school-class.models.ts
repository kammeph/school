import { z } from 'zod';

export const SchoolClassBook = z.object({
  id: z.string().optional(),
  name: z.string(),
  count: z.number(),
});

export type SchoolClassBook = z.infer<typeof SchoolClassBook>;

export const SchoolClass = z.object({
  id: z.string().optional(),
  grade: z.number(),
  letter: z.string(),
  pupilsCount: z.number(),
});

export type SchoolClass = z.infer<typeof SchoolClass>;
