import { Link } from '@tanstack/react-router';
import { cn } from '@/lib/utils/cn';

export function NavLink({ className, title, to }: { className?: string; title: string; to: string }) {
  return (
    <Link
      to={to}
      className={cn(
        'px-4 py-2 rounded-md text-foreground/80 font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground [&.active]:bg-primary [&.active]:text-primary-foreground [&.active]:shadow-sm',
        className
      )}
    >
      {title}
    </Link>
  );
}
