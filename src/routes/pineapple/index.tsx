import { useState, useEffect } from 'react';
import { Input } from '@/components/shadcn/input';
import { Button } from '@/components/shadcn/button';
import { createFileRoute, Link } from '@tanstack/react-router';
import { saveSearchState, getSearchState, schema, type TableSearch } from '@/lib/utils/table-search-state';

export const Route = createFileRoute('/pineapple/')({
  validateSearch: (search: Record<string, unknown>): TableSearch => schema.parse(search),
  component: RouteComponent,
});

function RouteComponent() {
  const [filter, setFilter] = useState('');
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  // On mount, restore search state if URL is empty but sessionStorage has data
  useEffect(() => {
    if (!search.filter) {
      const savedSearch = getSearchState('pineapple');
      if (savedSearch.filter) {
        navigate({ search: savedSearch, replace: true });
      }
    }
  }, []);

  // Save search state whenever it changes
  useEffect(() => {
    if (search.filter || search.sort || search.sortBy) {
      saveSearchState('pineapple', search);
    }
  }, [search]);

  // Sync input with URL
  // - i think we don't need to sync the input, because the apply filter button already navigates to the url and syncs it.
  // useEffect(() => {
  //   setFilter(search.filter || '');
  // }, [search.filter]);

  return (
    <div>
      <nav className="flex gap-2 mb-10">
        <Link className="hover:text-destructive" to={'/pineapple/$id'} params={{ id: '2' }} search={{}}>
          Pineapple 2
        </Link>
        <Link className="hover:text-destructive" to={'/pineapple/$id'} params={{ id: '4' }} search={{}}>
          Pineapple 4
        </Link>
        <Link className="hover:text-destructive" to={'/pineapple/$id'} params={{ id: '87' }} search={{}}>
          Pineapple 87
        </Link>
      </nav>
      <div>
        <div className="flex gap-2">
          <Input className="w-[200px]" value={filter} onChange={(e) => setFilter(e.target.value)} />
          <Button onClick={() => navigate({ search: filter ? { ...search, filter } : { ...search } })}>
            Apply Filter
          </Button>
        </div>
        {search.filter && <p className="mt-2 text-sm text-muted-foreground">Current filter: {search.filter}</p>}
      </div>
    </div>
  );
}
