import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/shadcn/button';
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/kiwi/$id_')({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  return (
    <div>
      <h3 className="text-4xl font-bold mb-10">Hello Kiwi No {id}!</h3>
      <Button asChild>
        <Link to="/kiwi">Close Details</Link>
      </Button>
    </div>
  );
}
