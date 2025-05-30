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

export async function getUserInfo() {
  return await getData<UserInfoResponse>({
    url: import.meta.env.VITE_USER_INFO_API_PATH,
    withCredentials: true,
  });
}

export async function login(credentials: LoginRequest) {
  return await mutateData<LoginResponse>({
    url: import.meta.env.VITE_LOGIN_API_PATH,
    method: 'POST',
    data: credentials,
    withCredentials: true,
  });
}

export async function logout() {
  return await mutateData<void>({
    url: import.meta.env.VITE_LOGOUT_API_PATH,
    method: 'POST',
    withCredentials: true,
  });
}
