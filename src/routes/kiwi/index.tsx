import { useState, useEffect } from 'react';
import { Input } from '@/components/shadcn/input';
import { Button } from '@/components/shadcn/button';
import { createFileRoute, Link } from '@tanstack/react-router';
import { saveSearchState, schema, type TableSearch } from '@/lib/utils/table-search-state';

const ROUTE_PATH = 'kiwi';

export const Route = createFileRoute('/kiwi/')({
  validateSearch: (search: Record<string, unknown>): TableSearch => schema.parse(search),
  component: RouteComponent,
});

function RouteComponent() {
  const [filter, setFilter] = useState('');
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  // On mount, restore search state if URL is empty but sessionStorage has data
  // useEffect(() => {
  //   if (Object.keys(search).length === 0) {
  //     const savedSearch = getSearchState(ROUTE_PATH);
  //     if (Object.keys(savedSearch).length > 0) {
  //       if (savedSearch.filter) setFilter(savedSearch.filter);
  //       navigate({ search: savedSearch, replace: true });
  //     }
  //   }
  // }, []);

  // Save search state whenever it changes
  useEffect(() => {
    if (search.filter || search.sort || search.sortBy) {
      saveSearchState(ROUTE_PATH, search);
    }
  }, [search]);

  // Sync input with URL
  useEffect(() => {
    setFilter(search.filter || '');
  }, [search.filter]);

  function applyFilter() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { filter: _, ...rest } = search;
    navigate({ search: filter ? { ...search, filter } : rest });
  }

  return (
    <div>
      <nav className="flex gap-2 mb-10">
        <Link className="hover:text-destructive" to={'/kiwi/$id'} params={{ id: '1' }} search={{}}>
          Kiwi 1
        </Link>
        <Link className="hover:text-destructive" to={'/kiwi/$id'} params={{ id: '2' }} search={{}}>
          Kiwi 2
        </Link>
        <Link className="hover:text-destructive" to={'/kiwi/$id'} params={{ id: '347' }} search={{}}>
          Kiwi 347
        </Link>
      </nav>
      <div>
        <div className="flex gap-2">
          <Input className="w-[200px]" value={filter} onChange={(e) => setFilter(e.target.value)} />
          <Button onClick={applyFilter}>Apply Filter</Button>
        </div>
        {search.filter && <p className="mt-2 text-sm text-muted-foreground">Current filter: {search.filter}</p>}
      </div>
    </div>
  );
}
