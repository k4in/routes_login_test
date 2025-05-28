import { Input } from './shadcn/input';
import { Button } from './shadcn/button';
import { useNavigate } from '@tanstack/react-router';
import { type TableSearch } from '@/lib/utils/table-search-state';
import { useState, useEffect } from 'react';

export function SearchField({ search, route }: { search: TableSearch; route: string }) {
  const navigate = useNavigate();
  const [localFilter, setLocalFilter] = useState(search.filter || '');

  useEffect(() => {
    setLocalFilter(search.filter || '');
  }, [search.filter]);

  function applyFilter() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { filter: _, ...rest } = search;
    navigate({ to: `/${route}`, search: localFilter ? { ...search, filter: localFilter } : rest });
  }

  return (
    <>
      <div className="flex gap-2">
        <Input className="w-[200px]" value={localFilter} onChange={(e) => setLocalFilter(e.target.value)} />
        <Button onClick={applyFilter}>Apply Filter</Button>
      </div>
      {search.filter && <p className="mt-2 text-sm text-muted-foreground">Current filter: {search.filter}</p>}
    </>
  );
}
