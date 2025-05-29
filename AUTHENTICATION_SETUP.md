# Authentication Setup Guide

This guide explains the authentication system implemented in your React application using TanStack Router and React Query.

## Overview

The authentication system uses:

- **TanStack Router's `beforeLoad`** for route protection
- **React Query** for auth state management with 5-minute stale time
- **Real backend API endpoints** for authentication operations
- **Custom query functions** (`getData` and `mutateData`) with credentials support

## Backend API Endpoints

The system expects these backend endpoints (configured in `.env.local`):

### 1. User Info Endpoint

- **URL**: `VITE_USER_INFO_API_PATH` (GET request)
- **Purpose**: Check current authentication status
- **Credentials**: Sent with `withCredentials: true`
- **Response Format**:

```typescript
{
  status: 'success' | 'failure';
  timestamp: string;
  level: string;
  user: null | string;
  data: {
    user_id?: number;
    is_authenticated: boolean;
  };
}
```

### 2. Login Endpoint

- **URL**: `VITE_LOGIN_API_PATH` (POST request)
- **Purpose**: Authenticate user credentials
- **Credentials**: Sent with `withCredentials: true`
- **Request Body**:

```typescript
{
  username: string;
  password: string;
}
```

- **Response Format**:

```typescript
{
  status: 'success' | 'failure';
  timestamp: string;
  level: string;
  user: null | string;
  data: {
    user_id: number;
    is_authenticated: boolean;
    token: string;
  }
}
```

### 3. Logout Endpoint

- **URL**: `VITE_LOGOUT_API_PATH` (POST request)
- **Purpose**: End user session
- **Credentials**: Sent with `withCredentials: true`
- **Request**: No payload required
- **Response**: Any (response is not processed)

## Files Created/Modified

### Core Authentication Files

1. **`src/hooks/useAuth.ts`**

   - React Query hook for authentication state
   - 5-minute stale time as requested
   - Exports `useAuth()` and `useAuthData()` hooks

2. **`src/lib/services/authService.ts`**

   - Service layer for API calls using `getData` and `mutateData`
   - Uses environment variables for endpoint URLs
   - All requests sent with `withCredentials: true`
   - Handles all authentication operations

3. **`src/lib/services/queryFns.ts`**
   - Generic `getData` and `mutateData` functions
   - Supports credentials, timeouts, and custom configurations
   - Used throughout the authentication system

### Route Protection

4. **`src/routes/__root.tsx`**

   - Added `beforeLoad` function for global route protection
   - Redirects unauthenticated users to `/login`
   - Preserves intended destination for post-login redirect

5. **`src/routes/login.tsx`**
   - Dedicated login route with form using `useMutation`
   - Prevents access if already authenticated
   - Handles post-login redirection
   - Uses TanStack Query mutation for better state management

### UI Components

6. **`src/components/avatar.tsx`**
   - User avatar with dropdown menu
   - Logout functionality using `authService`
   - Displays user ID from backend response

## How It Works

### Authentication Flow

1. **Route Access**: User navigates to any route
2. **Auth Check**: Root `beforeLoad` calls your backend's user info endpoint with credentials
3. **Cache**: Response cached for 5 minutes (React Query)
4. **Redirect**: If not authenticated → `/login?redirect=intended-url`
5. **Login**: User submits credentials via `useMutation` to your login endpoint
6. **Success**: Redirected to originally intended destination

### State Management

- **React Query** manages auth state with 5-minute stale time
- **Cache invalidation** on login/logout using `queryClient.invalidateQueries`
- **Automatic retries** disabled for auth failures
- **Window focus refetch** disabled for security
- **Mutation states** handled by `useMutation` hook

### Credentials Management

- **All requests** sent with `withCredentials: true`
- **Cookie-based authentication** supported
- **Session persistence** across browser sessions
- **CORS credentials** properly configured

## Environment Configuration

Ensure your `.env.local` file contains:

```env
VITE_LOGIN_API_PATH = "http://localhost/api/v2/auth/login/"
VITE_LOGOUT_API_PATH = "http://localhost/api/v2/auth/logout/"
VITE_USER_INFO_API_PATH = "http://localhost/api/v2/auth/user_info/"
```

## Testing

1. **Start your backend** with the required endpoints
2. **Access any protected route** - should redirect to login
3. **Login with valid credentials** - should redirect back to intended page
4. **Check avatar dropdown** - should show user info and logout option
5. **Logout** - should clear session and redirect to login
6. **Verify credentials** - cookies/sessions should persist across requests

## Security Features

- ✅ **Route Protection**: All routes except `/login` require authentication
- ✅ **Credentials Support**: All requests sent with `withCredentials: true`
- ✅ **Cookie Authentication**: Supports session cookies and HTTP-only cookies
- ✅ **Cache Security**: Auth cache cleared on logout
- ✅ **Redirect Preservation**: Users return to intended destination
- ✅ **Error Handling**: Graceful handling of auth failures
- ✅ **Mutation States**: Proper loading and error states via `useMutation`

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your backend allows credentials and requests from your frontend domain
2. **Environment Variables**: Verify all `VITE_*` variables are set correctly
3. **Backend Response Format**: Ensure your API returns the expected response structure
4. **Network Errors**: Check browser dev tools for failed requests
5. **Credentials Issues**: Verify your backend accepts and processes credentials correctly

### Debug Tips

- Check React Query DevTools for auth query status
- Monitor network tab for API calls and credential headers
- Verify environment variables are loaded: `console.log(import.meta.env)`
- Check if cookies are being set and sent properly
- Verify CORS configuration allows credentials

The authentication system is now fully integrated with your backend using your custom query functions and ready for production use!
