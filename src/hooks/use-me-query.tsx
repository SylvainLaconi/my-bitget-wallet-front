import { useQuery } from '@tanstack/react-query';
import { me } from '../api/auth';

export default function useMe() {
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => await me(),
    retry: false,
  });
}
