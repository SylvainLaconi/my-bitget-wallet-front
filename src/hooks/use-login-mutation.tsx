import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export default function useLogin({
  callbackError,
}: {
  callbackError: (error: string) => void;
}) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['login'],
    mutationFn: async (data: { email: string; password: string }) =>
      await login(data.email, data.password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
      navigate('/app/dashboard');
    },
    onError: (err: unknown) => {
      if (err instanceof Error) callbackError(err.message);
      else callbackError('Une erreur inconnue est survenue');
    },
  });
}
