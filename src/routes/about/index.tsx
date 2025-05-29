import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import axios from 'axios';

export const Route = createFileRoute('/about/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isPending } = useQuery({
    queryKey: ['auth_status'],
    queryFn: async () => {
      const response = await axios.get('http://localhost/api/v2/auth/user_info/');
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
  if (isPending) return <div>Loading...</div>;
  return (
    <div>
      <h3>Hello "/about/"!</h3>

      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  );
}
