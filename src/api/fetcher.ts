export async function fetcher(input: RequestInfo, init?: RequestInit) {
  const token = localStorage.getItem('accessToken');

  const res = await fetch(input, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || 'Erreur API');
  }

  return data;
}
