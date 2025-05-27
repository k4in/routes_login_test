import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/kiwi/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <nav className="flex gap-2 mb-10">
        <Link to={'/kiwi'} search={{ amount: 3, origin: 'Spain' }}>
          Option 1
        </Link>
        <Link to={'/kiwi'} search={{ amount: 9, origin: 'Ecuador' }}>
          Option 2
        </Link>
        <Link to={'/kiwi'} search={{ amount: 47, origin: 'Bangladesh' }}>
          Option 3
        </Link>
      </nav>
      <div>halloo...</div>
    </div>
  );
}
