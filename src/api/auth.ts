export async function login(email: string, password: string) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Email ou mot de passe incorrect');
  }

  return data;
}

export async function logout() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Erreur lors de la déconnexion');
  }

  return data;
}

export async function me() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.error || "Erreur lors de la récupération de l'utilisateur"
    );
  }

  return data;
}

export async function register(email: string, password: string) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Erreur lors de la création du compte');
  }

  return data;
}
