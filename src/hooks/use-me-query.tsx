import { useQuery } from '@tanstack/react-query';
import { fetcherWithAuth } from '../api/auth';

export function useMeQuery() {
  return useQuery({
    queryKey: ['me'],
    queryFn: () =>
      fetcherWithAuth(`${import.meta.env.VITE_API_URL}/api/auth/me`),
    retry: false,
  });
}
