import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/pineapple/')({
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();
  return (
    <div>
      <nav className="flex gap-2 mb-10">
        <Link to={'/pineapple'} search={{ amount: 13, origin: 'Argentina' }}>
          Option 1
        </Link>
        <Link to={'/pineapple'} search={{ amount: 8, origin: 'South Africa' }}>
          Option 2
        </Link>
        <Link to={'/pineapple'} search={{ amount: 963, origin: 'Samoa' }}>
          Option 3
        </Link>
      </nav>
      {Object.keys(search).length > 0 && (
        <div>
          Amount: {search.amount} Pineapples
          <br />
          Origin: {search.origin}
        </div>
      )}
    </div>
  );
}
