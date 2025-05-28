import { useEffect } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { saveSearchState, schema, type TableSearch } from '@/lib/utils/table-search-state';
import { SearchField } from '@/components/search-field';

const ROUTE_PATH = 'pineapple';

export const Route = createFileRoute('/pineapple/')({
  validateSearch: (search: Record<string, unknown>): TableSearch => schema.parse(search),
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();

  // Save search state whenever it changes
  useEffect(() => {
    if (search.filter || search.sort || search.sortBy) {
      saveSearchState(ROUTE_PATH, search);
    }
  }, [search]);

  return (
    <div>
      <nav className="flex gap-2 mb-10">
        <Link className="hover:text-destructive" to={'/pineapple/$id'} params={{ id: '2' }}>
          Pineapple 2
        </Link>
        <Link className="hover:text-destructive" to={'/pineapple/$id'} params={{ id: '4' }}>
          Pineapple 4
        </Link>
        <Link className="hover:text-destructive" to={'/pineapple/$id'} params={{ id: '97' }}>
          Pineapple 97
        </Link>
      </nav>
      <div>
        <SearchField search={search} route={ROUTE_PATH} />
      </div>
    </div>
  );
}
