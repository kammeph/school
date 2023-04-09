import { z } from 'zod';

export const Countable = z.object({
  id: z.string(),
  name: z.string(),
  count: z.number(),
});

export type Countable = z.infer<typeof Countable>;
