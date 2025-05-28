import { Link } from '@tanstack/react-router';
import { cn } from '@/lib/utils/cn';

type NavLinkProps<TSearch extends Record<string, unknown>> = {
  title: string;
  to: string;
  search?: TSearch;
  className?: string;
};

export function NavLink<TSearch extends Record<string, unknown>>({
  className,
  title,
  to,
  search,
}: NavLinkProps<TSearch>) {
  return (
    <Link
      to={to}
      className={cn(
        'px-4 py-2 rounded-md text-foreground/80 font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground [&.active]:bg-primary [&.active]:text-primary-foreground [&.active]:shadow-sm',
        className
      )}
      search={search}
    >
      {title}
    </Link>
  );
}
