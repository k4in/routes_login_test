import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Avatar } from '@/components/avatar';
import { NavLink } from '@/components/nav-link';

export const Route = createRootRoute({
  component: () => (
    <>
      <header className="bg-background border-b border-border/40 backdrop-blur-md sticky top-0 z-50">
        <div className="flex justify-between px-20 h-16 items-center">
          <nav className="flex gap-2">
            <NavLink title="Home" to="/" />
            <NavLink title="Pineapple" to="/pineapple" hasSearch />
            <NavLink title="Kiwi" to="/kiwi" hasSearch />
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
