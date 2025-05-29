import { Link } from '@tanstack/react-router';
import { cn } from '@/lib/utils/cn';
import { useTableSearchStore } from '@/hooks/useTableSearchStore';

type NavLinkProps = {
  title: string;
  to: string;
  hasSearch?: boolean;
  className?: string;
};

export function NavLink({ className, title, to, hasSearch }: NavLinkProps) {
  const searchStore = useTableSearchStore(to.startsWith('/') ? to.slice(1) : to).searchStore;

  return (
    <Link
      activeOptions={{ exact: false, includeSearch: false }}
      to={to}
      className={cn(
        'px-4 py-2 rounded-md text-foreground/80 font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground [&.active]:bg-primary [&.active]:text-primary-foreground [&.active]:shadow-sm',
        className
      )}
      search={hasSearch ? searchStore : undefined}
    >
      {title}
    </Link>
  );
}
