import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export default function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => await logout(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['me'] });
      navigate('/auth/login');
    },
  });
}
