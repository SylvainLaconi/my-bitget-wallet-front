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

  localStorage.setItem('accessToken', data.accessToken);

  return data;
}

export async function logout() {
  localStorage.removeItem('accessToken');
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

// async function refreshToken() {
//   const res = await fetch(
//     `${import.meta.env.VITE_API_URL}/api/auth/refresh-token`,
//     {
//       method: 'GET',
//       credentials: 'include',
//     }
//   );

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(data.error || 'Erreur lors de la récupération du token');
//   }

//   localStorage.setItem('accessToken', data.accessToken);

//   return data.accessToken;
// }

export async function fetcherWithAuth(
  input: RequestInfo | URL,
  init?: RequestInit
) {
  let accessToken = localStorage.getItem('accessToken');

  const newInit: RequestInit = {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };

  let res = await fetch(input, newInit);

  // if (res.status === 401) {
  //   accessToken = await refreshToken();
  //   newInit.headers = {
  //     ...(newInit.headers || {}),
  //     Authorization: `Bearer ${accessToken}`,
  //     'Content-Type': 'application/json',
  //   };
  //   res = await fetch(input, newInit);
  // }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Erreur lors de la récupération du token');
  }

  return res.json();
}
