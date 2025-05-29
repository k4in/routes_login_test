import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/shadcn/button';
import { Link } from '@tanstack/react-router';
import { useTableSearchStore } from '@/hooks/useTableSearchStore';

export const Route = createFileRoute('/kiwi/$id_')({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const savedSearch = useTableSearchStore('kiwi').searchStore;

  return (
    <div>
      <h3 className="text-4xl font-bold mb-10">Hello Kiwi No {id}!</h3>
      <Button asChild>
        <Link to="/kiwi" search={savedSearch}>
          Close Details
        </Link>
      </Button>
    </div>
  );
}
