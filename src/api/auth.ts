import { fetcher } from './fetcher';

// LOGIN
export async function login(email: string, password: string) {
  const data = await fetcher(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  localStorage.setItem('accessToken', data.accessToken);
  return data;
}

// LOGOUT
export async function logout() {
  localStorage.removeItem('accessToken');
}

// ME
export async function me() {
  return fetcher(`${import.meta.env.VITE_API_URL}/api/auth/me`);
}

// REGISTER
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
