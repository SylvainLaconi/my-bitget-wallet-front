import { useEffect, useState } from 'react';

type WalletCoin = {
  tokenId: string;
  token: { name: string; ticker: string };
  available: number;
  frozen: number;
  locked: number;
  limitAvailable: number;
  uTime: number;
  lastPrice?: number;
  change24hPercent?: number;
  earnQuantity: number;
  valueUSD?: number;
};

export function useWalletStream() {
  const [coins, setCoins] = useState<WalletCoin[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    const url = `${import.meta.env.VITE_API_URL}/stream?token=${token}`;
    const eventSource = new EventSource(url);

    const filterNonZero = (c: WalletCoin) =>
      c.available + c.frozen + c.locked + c.earnQuantity > 0;

    // Snapshot initial
    eventSource.addEventListener('snapshot', (event) => {
      const data: WalletCoin[] = JSON.parse((event as MessageEvent).data);
      setCoins(
        data
          .map((c) => ({
            ...c,
            lastPrice: 0,
            change24hPercent: 0,
            valueUSD: 0,
          }))
          .filter(filterNonZero)
      );
    });

    // Update portefeuille
    eventSource.addEventListener('update', (event) => {
      const data: WalletCoin = JSON.parse((event as MessageEvent).data);

      setCoins((prev) => {
        const index = prev.findIndex((c) => c.tokenId === data.tokenId);

        const updatedCoin: WalletCoin = {
          ...data,
          lastPrice: prev[index]?.lastPrice || 0,
          change24hPercent: prev[index]?.change24hPercent || 0,
          valueUSD: prev[index]?.lastPrice
            ? parseFloat(
                (
                  prev[index].lastPrice *
                  (data.available +
                    data.frozen +
                    data.locked +
                    data.earnQuantity)
                ).toFixed(2)
              )
            : 0,
        };

        let newCoins;
        if (index >= 0) {
          const tmp = [...prev];
          tmp[index] = updatedCoin;
          newCoins = tmp;
        } else {
          newCoins = [...prev, updatedCoin];
        }

        // Filtrer les tokens à zéro
        return newCoins.filter(filterNonZero);
      });
    });

    // Update prix
    eventSource.addEventListener('price', (event) => {
      const data = JSON.parse((event as MessageEvent).data);

      setCoins((prev) =>
        prev
          .map((c) =>
            c.token.ticker.toUpperCase() + 'USDT' === data.instId
              ? {
                  ...c,
                  lastPrice: parseFloat(data.lastPr),
                  change24hPercent: parseFloat(data.change24h) * 100,
                  valueUSD: parseFloat(
                    (
                      (c.available + c.earnQuantity + c.frozen + c.locked) *
                      parseFloat(data.lastPr)
                    ).toFixed(2)
                  ),
                }
              : c
          )
          .filter(filterNonZero)
      );
    });

    eventSource.onerror = (err) => {
      console.error('SSE error', err);
      eventSource.close();
    };

    return () => eventSource.close();
  }, []);

  return coins;
}
