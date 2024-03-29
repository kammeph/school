import { z } from 'zod';

export const StorageBook = z.object({
  id: z.string(),
  name: z.string(),
  count: z.number(),
});

export type StorageBook = z.infer<typeof StorageBook>;

export const Storage = z.object({
  id: z.string().optional(),
  name: z.string(),
  location: z.string(),
  totalCount: z.number().optional(),
});

export type Storage = z.infer<typeof Storage>;
