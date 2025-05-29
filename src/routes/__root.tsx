import { createRootRoute, Outlet, redirect } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Avatar } from '@/components/avatar';
import { NavLink, NavLinkWithSearch } from '@/components/nav-link';
import { authService } from '@/lib/services/authService';

export const Route = createRootRoute({
  beforeLoad: async ({ context, location }) => {
    // Skip auth check for login page
    if (location.pathname === '/login') {
      return;
    }

    try {
      const authData = await (context as { queryClient: any }).queryClient.fetchQuery({
        queryKey: ['auth'],
        queryFn: authService.checkAuth,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: false,
      });

      if (!authData.data.is_authenticated) {
        throw redirect({
          to: '/login',
          search: {
            // Store the intended destination to redirect after login
            redirect: location.href,
          },
        });
      }
    } catch {
      // If auth check fails, redirect to login
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: () => (
    <>
      <header className="bg-background border-b border-border/40 backdrop-blur-md sticky top-0 z-50">
        <div className="flex justify-between px-20 h-16 items-center">
          <nav className="flex gap-2">
            <NavLink title="Home" to="/" />
            <NavLinkWithSearch title="Pineapple" to="/pineapple" />
            <NavLinkWithSearch title="Kiwi" to="/kiwi" />
            <NavLink title="About" to="/about" />
          </nav>
          <Avatar />
        </div>
      </header>

      <div className="px-20 py-10 bg-background min-h-screen">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  ),
});
