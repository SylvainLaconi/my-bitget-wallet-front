import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useMe } from '../contexts/me-context';

const loginSchema = z.object({
  email: z.string().email({ message: 'Email invalide' }),
  password: z.string().min(1, { message: 'Mot de passe requis' }),
});

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setMe } = useMe();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const data = {
      email: String(form.get('email') ?? ''),
      password: String(form.get('password') ?? ''),
    };

    const parsed = loginSchema.safeParse(data);
    if (!parsed.success) {
      // prends le premier message d'erreur utile
      const first = Object.values(parsed.error.flatten().fieldErrors)
        .flat()
        .filter(Boolean)[0];
      setError(first ?? 'Données invalides');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      });
      const json = await res.json();

      if (!res.ok) {
        setError(json.error || 'Erreur de connexion');
        setLoading(false);
        return;
      }

      setMe(json);

      navigate('/dashboard');
    } catch (err: unknown) {
      console.error(err);
      setError('Erreur réseau, réessayez');
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
      <input name="email" type="email" placeholder="Email" className="input" />
      <input
        name="password"
        type="password"
        placeholder="Mot de passe"
        className="input"
      />

      <div className="h-4">
        {error && <div className="text-red-600 text-sm">{error}</div>}
      </div>

      <button type="submit" disabled={loading} className="btn">
        {loading ? 'Connexion…' : 'Se connecter'}
      </button>
    </form>
  );
}
