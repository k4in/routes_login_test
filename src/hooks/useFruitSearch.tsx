import { create } from 'zustand';
import { useLocation } from '@tanstack/react-router';
import { z } from 'zod';

export const schema = z.object({
  filter: z.string().optional(),
  sort: z.string().optional(),
  sortBy: z.enum(['asc', 'desc']).optional(),
});

export type FruitSearch = z.infer<typeof schema>;

interface SearchParameterStore {
  searchStore: FruitSearch;
}

interface SearchParameterActions {
  setSearchStore: (search: FruitSearch) => void;
}

const stores: Record<string, ReturnType<typeof createSearchStore>> = {};

function createSearchStore(initialValues: FruitSearch) {
  return create<SearchParameterActions & SearchParameterStore>((set) => ({
    searchStore: initialValues || {},
    setSearchStore: (search) => set({ searchStore: search }),
  }));
}

export function useSearchParameters(route: string) {
  // Create new store for route if it doesn't exist
  const { search } = useLocation();
  if (!stores[route]) {
    stores[route] = createSearchStore(search);
  }

  const store = stores[route];

  const searchStore = store((state) => state.searchStore);
  const setSearchStore = store((state) => state.setSearchStore);

  return {
    searchStore,
    setSearchStore,
  };
}
