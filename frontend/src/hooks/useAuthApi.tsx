import { useMutation, useQuery } from '@tanstack/react-query';
import type { LoginBody, RegisterBody } from '../types';

export function useMe() {
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3001/api/auth/me', {
        credentials: 'include',
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }
      return result;
    },
  });
}

export function useGetUsers() {
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3001/api/auth/users', {
        credentials: 'include',
      });
      const result = await res.json();
      console.log(result);

      if (!res.ok) {
        throw new Error(result.message);
      }
      return result;
    },
  });
}

export function useGetUserById(userId: string | undefined) {
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3001/api/auth/users/${userId}`,
        {
          credentials: 'include',
        }
      );
      const result = await res.json();
      console.log(result);

      if (!res.ok) {
        throw new Error(result.message);
      }
      return result;
    },
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: async (body: LoginBody) => {
      const res = await fetch('http://localhost:3001/api/auth/login', {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      return result;
    },
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      const res = await fetch('http://localhost:3001/api/auth/logout', {
        credentials: 'include',
        method: 'POST',
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      return result;
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: async (body: RegisterBody) => {
      const res = await fetch('http://localhost:3001/api/auth/register', {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      return result;
    },
  });
}

export function useDeleteUser(userId: string | undefined) {
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`http://localhost:3001/api/auth/${userId}`, {
        credentials: 'include',
        method: 'DELETE',
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      return result;
    },
  });
}
