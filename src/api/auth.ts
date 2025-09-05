import { fetcher } from './fetcher';

export async function login(email: string, password: string) {
  const data = await fetcher(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  localStorage.setItem('accessToken', data.accessToken);
  return data;
}

export async function logout() {
  localStorage.removeItem('accessToken');
}

export async function me() {
  return fetcher(`${import.meta.env.VITE_API_URL}/api/auth/me`);
}

export async function register(email: string, password: string) {
  const data = await fetcher(
    `${import.meta.env.VITE_API_URL}/api/auth/register`,
    {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }
  );

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
