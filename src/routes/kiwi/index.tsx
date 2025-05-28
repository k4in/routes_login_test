import { useState } from 'react';
import { Input } from '@/components/shadcn/input';
import { Button } from '@/components/shadcn/button';
import { createFileRoute, Link } from '@tanstack/react-router';
import { schema, type FruitSearch } from '@/hooks/useFruitSearch';

export const Route = createFileRoute('/kiwi/')({
  validateSearch: (search: Record<string, unknown>): FruitSearch => schema.parse(search),
  component: RouteComponent,
});

function RouteComponent() {
  const [filter, setFilter] = useState('');
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
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
        <div className="flex gap-2">
          <Input className="w-[200px]" value={filter} onChange={(e) => setFilter(e.target.value)} />
          <Button onClick={() => navigate({ search: { ...search, filter } })}>Apply Filter</Button>
        </div>
      </div>
    </div>
  );
}
