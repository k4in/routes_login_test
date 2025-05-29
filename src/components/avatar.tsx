import { useRouter } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { LogOut } from 'lucide-react';
import { useAuthData } from '@/hooks/useAuth';
import { authService } from '@/lib/services/authService';
import { Button } from './shadcn/button';

export function Avatar() {
  const { isAuthenticated, userId } = useAuthData();
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

  // Don't render anything if user is not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">user-id: {userId || 'unknown'}</span>
      <Button variant="outline" size="icon" onClick={handleLogout} className="flex items-center gap-2">
        <LogOut />
      </Button>
    </div>
  );
}
