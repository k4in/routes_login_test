import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/kiwi/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/kiwi/"!</div>;
}
