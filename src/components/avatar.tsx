import { useState } from 'react';
import { useRouter } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthData } from '@/hooks/useAuth';
import { authService } from '@/lib/services/authService';
import { Button } from './shadcn/button';

export function Avatar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, userId } = useAuthData();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    try {
      // Call logout API
      await authService.logout();

      // Clear the auth query cache
      queryClient.removeQueries({ queryKey: ['auth'] });

      // Navigate to login
      router.navigate({ to: '/login' });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="relative">
      <div className="relative group cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
        <div className="size-10 rounded-full bg-secondary border-2 border-border hover:border-primary transition-all duration-200 group-hover:shadow-lg group-hover:shadow-primary/20">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center">
            {userId ? (
              <span className="text-sm font-medium text-primary">{userId.toString().charAt(0)}</span>
            ) : (
              <div className="w-6 h-6 rounded-full bg-primary/80"></div>
            )}
          </div>
        </div>
      </div>

      {showDropdown && (
        <>
          {/* Backdrop to close dropdown */}
          <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />

          {/* Dropdown menu */}
          <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-md shadow-lg z-20">
            <div className="p-3 border-b border-border">
              <p className="text-sm font-medium">User {userId || 'Unknown'}</p>
              <p className="text-xs text-muted-foreground">{user || 'No additional info'}</p>
            </div>
            <div className="p-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={handleLogout}
              >
                Sign out
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
