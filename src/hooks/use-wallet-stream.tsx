import { useEffect, useState } from 'react';

export function useWalletStream() {
  const [coins, setCoins] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    const url = `${import.meta.env.VITE_API_URL}/stream?token=${token}`;
    const eventSource = new EventSource(url);

    eventSource.addEventListener('snapshot', (event) => {
      const data = JSON.parse((event as MessageEvent).data);
      setCoins(data);
    });

    eventSource.addEventListener('update', (event) => {
      const data = JSON.parse((event as MessageEvent).data);
      setCoins((prev) => {
        const index = prev.findIndex((c) => c.tokenId === data.tokenId);
        if (index >= 0) {
          const updated = [...prev];
          updated[index] = data;
          return updated;
        }
        return [...prev, data];
      });
    });

    eventSource.onerror = (err) => {
      console.error('SSE error', err);
      eventSource.close();
    };

    return () => eventSource.close();
  }, []);

  return coins;
}
