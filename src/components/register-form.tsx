import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import useRegister from '../hooks/use-register-mutation';

const registerSchema = z
  .object({
    email: z.string().email({ message: 'Email invalide' }),
    password: z.string().min(1, { message: 'Mot de passe requis' }),
    passwordConfirm: z
      .string()
      .min(1, { message: 'Confirmer le mot de passe requis' }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['passwordConfirm'],
  });

export default function RegisterForm() {
  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();

  const registerMutation = useRegister({
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
      passwordConfirm: form.passwordConfirm.value,
    };

    const parse = registerSchema.safeParse(formData);
    if (!parse.success) {
      setFormError('Formulaire invalide');
      return;
    }

    registerMutation.mutate(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 gap-3 w-full flex flex-col justify-between"
    >
      <div className="flex flex-col gap-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input"
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          className="input"
        />
        <input
          type="password"
          name="passwordConfirm"
          placeholder="Confirmer le mot de passe"
          className="input"
        />
        <div className="h-4 flex justify-center">
          {formError && <div className="text-red-600 text-sm">{formError}</div>}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="btn"
        >
          {registerMutation.isPending ? 'Création…' : 'Créer un compte'}
        </button>
        <button
          className="btn-secondary"
          type="button"
          onClick={() => navigate('/auth/login')}
        >
          Se connecter
        </button>
      </div>
    </form>
  );
}
