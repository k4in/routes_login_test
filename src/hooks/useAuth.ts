import { useQuery, queryOptions } from '@tanstack/react-query';
import { getUserInfo } from '@/lib/services/authService';

export type { LoginResponse, UserInfoResponse, LoginRequest } from '@/lib/services/authService';

export const authQueryOptions = queryOptions({
  queryKey: ['user_info'],
  queryFn: getUserInfo,
  staleTime: 5 * 60 * 1000, // 5 minutes
  retry: false, // Don't retry auth failures
});

export function useAuthData() {
  const { data, isPending } = useQuery(authQueryOptions);

  return { data, isPending };
}
