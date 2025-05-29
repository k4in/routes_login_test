import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useCallback, useMemo } from 'react';

import { z } from 'zod';

export const schema = z.object({
  filter: z.string().optional(),
  sort: z.string().optional(),
  sortBy: z.enum(['asc', 'desc']).optional(),
});

export type TableSearch = z.infer<typeof schema>;

interface SearchParameterStore {
  searchStores: Record<string, TableSearch>;
}

interface SearchParameterActions {
  setSearchStore: (route: string, search: TableSearch) => void;
}

// Create a stable empty object
const EMPTY_SEARCH: TableSearch = {};

// Single global store for all routes
const useGlobalSearchStore = create<SearchParameterActions & SearchParameterStore>()(
  persist(
    (set) => ({
      searchStores: {},

      setSearchStore: (route: string, search: TableSearch) =>
        set((state) => ({
          searchStores: { ...state.searchStores, [route]: search },
        })),
    }),
    {
      name: 'tableSearchState',
      storage: {
        getItem: (name) => {
          const str = sessionStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => sessionStorage.removeItem(name),
      },
    }
  )
);

export function useTableSearchStore(route: string) {
  const globalSetSearchStoreAction = useGlobalSearchStore((state) => state.setSearchStore);

  const searchDataForRoute = useGlobalSearchStore(
    // This is the recommended way in Zustand to select state that depends on component props (like route). It memoizes the selector function, ensuring it's stable as long as route doesn't change, which optimizes re-renders and subscriptions.
    useMemo(() => (state) => state.searchStores[route] ?? EMPTY_SEARCH, [route])
  );

  // Memoize the setter function for this specific route
  // Its reference will only change if `route` changes (globalSetSearchStoreAction is stable)
  const setSpecificSearchStore = useCallback(
    (search: TableSearch) => {
      globalSetSearchStoreAction(route, search);
    },
    [globalSetSearchStoreAction, route]
  );

  // The returned object changes if searchDataForRoute changes or if setSpecificSearchStore changes (i.e., route changes)
  return useMemo(
    () => ({
      searchStore: searchDataForRoute,
      setSearchStore: setSpecificSearchStore,
    }),
    [searchDataForRoute, setSpecificSearchStore]
  );
}

// export function useTableSearchStore(route: string) {
//   const setSearchStore = useGlobalSearchStore((state) => state.setSearchStore);

//   // Use a more stable selector with useMemo
//   const searchStore = useGlobalSearchStore(
//     // This is the recommended way in Zustand to select state that depends on component props (like route). It memoizes the selector function, ensuring it's stable as long as route doesn't change, which optimizes re-renders and subscriptions.
//     useMemo(() => (state) => state.searchStores[route] ?? EMPTY_SEARCH, [route])
//   );

//   return useMemo(
//     () => ({
//       searchStore,
//       setSearchStore: (search: TableSearch) => setSearchStore(route, search),
//     }),
//     [searchStore, setSearchStore, route]
//   );
// }
