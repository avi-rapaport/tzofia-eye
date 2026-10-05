import { useMutation, useQuery } from '@tanstack/react-query';
import type { CreateAlertBody, UpdateAlertBody } from '../types';

export function useGetAlerts() {
  return useQuery({
    queryKey: ['alerts'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/api/alerts`);
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      return result;
    },
  });
}

export function useGetAlertById(alertId: string) {
  return useQuery({
    queryKey: ['alert'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/api/alerts/${alertId}`);
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      return result;
    },
  });
}

export function useCreateAlerts() {
  return useMutation({
    mutationFn: async (body: CreateAlertBody) => {
      const res = await fetch('http://localhost:3001/api/alerts', {
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

export function useUpdateAlerts() {
  return useMutation({
    mutationFn: async (body: UpdateAlertBody) => {
      const res = await fetch('http://localhost:3001/api/alerts', {
        credentials: 'include',
        method: 'PUT',
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

export function useDeleteAlerts(alertId: string) {
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`http://localhost:3001/api/alerts/${alertId}`, {
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
