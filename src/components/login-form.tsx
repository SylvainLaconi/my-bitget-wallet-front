import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import useLogin from '../hooks/use-login-mutation';

const loginSchema = z.object({
  email: z.string().email({ message: 'Email invalide' }),
  password: z.string().min(1, { message: 'Mot de passe requis' }),
});

export default function LoginForm() {
  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();

  const loginMutation = useLogin({
    callbackError: (error) => {
      setFormError(error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    const form = e.currentTarget;
    const formData = {
      email: form.email.value,
      password: form.password.value,
    };

    const parse = loginSchema.safeParse(formData);
    if (!parse.success) {
      setFormError('Formulaire invalide');
      return;
    }

    loginMutation.mutate(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 gap-3 w-full flex flex-col justify-between"
    >
      <div className="flex flex-col gap-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input"
        />
        <input
          name="password"
          type="password"
          placeholder="Mot de passe"
          className="input"
        />

        <div className="h-4 flex justify-center">
          {formError && <div className="text-red-600 text-sm">{formError}</div>}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="btn"
        >
          {loginMutation.isPending ? 'Connexion…' : 'Se connecter'}
        </button>
        <button
          className="btn-secondary"
          type="button"
          onClick={() => navigate('/auth/register')}
        >
          Créer un compte
        </button>
      </div>
    </form>
  );
}
