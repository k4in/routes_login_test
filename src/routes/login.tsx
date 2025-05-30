import { createFileRoute, redirect, useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/shadcn/button';
import { Input } from '@/components/shadcn/input';
import { authQueryOptions } from '@/hooks/useAuth';
import { z } from 'zod';
import { login } from '@/lib/services/authService';

const loginSearchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute('/login')({
  validateSearch: (search: Record<string, unknown>): z.infer<typeof loginSearchSchema> =>
    loginSearchSchema.parse(search),
  beforeLoad: async ({ context: { queryClient } }) => {
    const authData = await queryClient.fetchQuery(authQueryOptions);

    if (authData.data.is_authenticated) {
      throw redirect({
        to: '/',
      });
    }
  },
  component: LoginComponent,
});

function LoginComponent() {
  const [username, setUsername] = useState(import.meta.env.VITE_TESTUSER_LOGIN || '');
  const [password, setPassword] = useState(import.meta.env.VITE_TESTUSER_PASSWORD || '');

  const router = useRouter();
  const queryClient = useQueryClient();
  const search = Route.useSearch();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async (response) => {
      if (response.status === 'success' && response.data.is_authenticated) {
        // Invalidate and refetch auth query to update the cache
        await queryClient.invalidateQueries({ queryKey: ['user_info'] });

        // Navigate to the intended destination or home
        const redirectTo = search.redirect || '/';
        router.navigate({ to: redirectTo });
      } else {
        throw new Error('Login failed - invalid response');
      }
    },
    onError: (error) => {
      console.error('Login error:', error);
    },
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ username, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-card rounded-lg border">
        <div>
          <h2 className="text-3xl font-bold text-center">Sign in</h2>
          <p className="mt-2 text-center text-muted-foreground">Please sign in to access the application</p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-2">
              Username
            </label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <Input
              id="password"
              type="text" // just for debugging
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          {loginMutation.error && (
            <div className="text-destructive text-sm text-center">
              {loginMutation.error instanceof Error ? loginMutation.error.message : 'Login failed'}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </div>
    </div>
  );
}
