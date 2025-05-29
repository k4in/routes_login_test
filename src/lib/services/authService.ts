// Real authentication service using your backend API
import { getData, mutateData } from './queryFns';

export interface LoginRequest extends Record<string, unknown> {
  username: string;
  password: string;
}

export interface LoginResponse {
  status: 'success' | 'failure';
  timestamp: string;
  level: string;
  user: null | string;
  data: {
    user_id: number;
    is_authenticated: boolean;
    token: string;
  };
}

export interface UserInfoResponse {
  status: 'success' | 'failure';
  timestamp: string;
  level: string;
  user: null | string;
  data: {
    user_id?: number;
    is_authenticated: boolean;
  };
}

export const authService = {
  // Check authentication status
  async checkAuth(): Promise<UserInfoResponse> {
    return getData<UserInfoResponse>({
      url: import.meta.env.VITE_USER_INFO_API_PATH,
      withCredentials: true,
    });
  },

  // Login user
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return mutateData<LoginResponse>({
      url: import.meta.env.VITE_LOGIN_API_PATH,
      method: 'POST',
      data: credentials,
      withCredentials: true,
    });
  },

  // Logout user
  async logout(): Promise<void> {
    await mutateData<void>({
      url: import.meta.env.VITE_LOGOUT_API_PATH,
      method: 'POST',
      withCredentials: true,
    });
  },
};
