import { z } from 'zod';

export const schema = z.object({
  filter: z.string().optional(),
  sort: z.string().optional(),
  sortBy: z.enum(['asc', 'desc']).optional(),
});

export type TableSearch = z.infer<typeof schema>;

const SEARCH_STATE_KEY = 'tableSearchState';

export function saveSearchState(category: string, search: TableSearch) {
  const currentState = JSON.parse(sessionStorage.getItem(SEARCH_STATE_KEY) || '{}');
  currentState[category] = search;
  sessionStorage.setItem(SEARCH_STATE_KEY, JSON.stringify(currentState));
}

export function getSearchState(category: string): TableSearch {
  const currentState = JSON.parse(sessionStorage.getItem(SEARCH_STATE_KEY) || '{}');
  return currentState[category] || {};
}
