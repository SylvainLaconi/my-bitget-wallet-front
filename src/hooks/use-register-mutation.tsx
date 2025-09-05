import { useMutation, useQueryClient } from '@tanstack/react-query';
import { register } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export default function useRegister({
  callbackError,
}: {
  callbackError: (error: string) => void;
}) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['register'],
    mutationFn: async (data: {
      email: string;
      password: string;
      passwordConfirm: string;
    }) => await register(data.email, data.password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
      navigate('/auth/login');
    },
    onError: (err: unknown) => {
      if (err instanceof Error) callbackError(err.message);
      else callbackError('Une erreur inconnue est survenue');
    },
  });
}
