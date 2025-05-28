import { z } from 'zod';

export const schema = z.object({
  filter: z.string().optional(),
  sort: z.string().optional(),
  sortBy: z.enum(['asc', 'desc']).optional(),
});

export type FruitSearch = z.infer<typeof schema>;
