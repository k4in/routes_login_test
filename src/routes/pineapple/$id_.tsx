import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/shadcn/button';
import { Link } from '@tanstack/react-router';
import { getSearchState } from '@/lib/utils/table-search-state';

export const Route = createFileRoute('/pineapple/$id_')({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const savedSearch = getSearchState('pineapple');

  return (
    <div>
      <h3 className="text-4xl font-bold mb-10">Hello Pineapple No {id}!</h3>
      <Button asChild>
        <Link to="/pineapple" search={savedSearch}>
          Close Details
        </Link>
      </Button>
    </div>
  );
}
