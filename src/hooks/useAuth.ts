import { useQuery } from '@tanstack/react-query';
import { authService } from '@/lib/services/authService';

export type { LoginResponse, UserInfoResponse, LoginRequest } from '@/lib/services/authService';

export function useAuth() {
  return useQuery({
    queryKey: ['auth'],
    queryFn: authService.checkAuth,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false, // Don't retry auth failures
    refetchOnWindowFocus: false, // Don't refetch on window focus for auth
  });
}

export function useAuthData() {
  const { data } = useAuth();
  return {
    isAuthenticated: data?.data?.is_authenticated ?? false,
    userId: data?.data?.user_id,
    user: data?.user,
  };
}
