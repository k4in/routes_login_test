import { useEffect } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { SearchField } from '@/components/search-field';
import { useTableSearchStore, schema, type TableSearch } from '@/hooks/useTableSearchStore';

const ROUTE_PATH = 'kiwi';

export const Route = createFileRoute('/kiwi/')({
  validateSearch: (search: Record<string, unknown>): TableSearch => schema.parse(search),
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();
  const setSearchStore = useTableSearchStore(ROUTE_PATH).setSearchStore;

  // Save search state whenever it changes
  useEffect(() => {
    setSearchStore(search);
  }, [search, setSearchStore]);

  return (
    <div>
      <nav className="flex gap-2 mb-10">
        <Link className="hover:text-destructive" to={'/kiwi/$id'} params={{ id: '1' }}>
          Kiwi 1
        </Link>
        <Link className="hover:text-destructive" to={'/kiwi/$id'} params={{ id: '2' }}>
          Kiwi 2
        </Link>
        <Link className="hover:text-destructive" to={'/kiwi/$id'} params={{ id: '347' }}>
          Kiwi 347
        </Link>
      </nav>
      <div>
        <SearchField search={search} route={ROUTE_PATH} />
      </div>
    </div>
  );
}
