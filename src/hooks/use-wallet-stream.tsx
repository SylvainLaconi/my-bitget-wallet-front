import { useEffect, useState } from 'react';

export type WalletCoin = {
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
  orderQuantity: number;
  valueUSD?: number;
};

export type FormattedWalletCoin = {
  tokenId: string;
  name: string;
  ticker: string;
  available: number;
  frozen: number;
  locked: number;
  limitAvailable: number;
  uTime: number;
  lastPrice?: number;
  change24hPercent?: number;
  earnQuantity: number;
  orderQuantity: number;
  valueUSD?: number;
};

export function useWalletStream() {
  const [coins, setCoins] = useState<FormattedWalletCoin[]>([]);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [totalEarnValue, setTotalEarnValue] = useState<number>(0);
  const [totalFrozenValue, setTotalFrozenValue] = useState<number>(0);
  const [totalAvailableValue, setTotalAvailableValue] = useState<number>(0);

  useEffect(() => {
    setTotalValue(coins.reduce((acc, c) => acc + (c.valueUSD || 0), 0));
    setTotalEarnValue(
      coins.reduce(
        (acc, c) => acc + (c.earnQuantity * (c.lastPrice || 0) || 0),
        0
      )
    );
    setTotalFrozenValue(
      coins.reduce((acc, c) => acc + (c.frozen * (c.lastPrice || 0) || 0), 0)
    );
    setTotalAvailableValue(
      coins.reduce((acc, c) => acc + (c.available * (c.lastPrice || 0) || 0), 0)
    );
  }, [coins]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    const url = `${import.meta.env.VITE_API_URL}/stream?token=${token}`;
    const eventSource = new EventSource(url);

    const filterNonZero = (c: FormattedWalletCoin) =>
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
            valueUSD:
              c.token.ticker.toUpperCase() === 'USDT'
                ? c.available + c.frozen + c.locked + c.earnQuantity
                : 0,
            orderQuantity: 0,
            name: c.token.name,
            ticker: c.token.ticker,
          }))
          .filter(filterNonZero)
      );
    });

    // Update portefeuille
    eventSource.addEventListener('update', (event) => {
      const data: WalletCoin = JSON.parse((event as MessageEvent).data);

      setCoins((prev) => {
        const index = prev.findIndex((c) => c.tokenId === data.tokenId);

        const valueUSD =
          data.token.ticker.toUpperCase() === 'USDT'
            ? data.available + data.frozen + data.locked + data.earnQuantity
            : prev[index]?.lastPrice
              ? parseFloat(
                  (
                    prev[index].lastPrice *
                    (data.available +
                      data.frozen +
                      data.locked +
                      data.earnQuantity)
                  ).toFixed(2)
                )
              : 0;

        const updatedCoin: FormattedWalletCoin = {
          ...data,
          lastPrice: prev[index]?.lastPrice || 0,
          change24hPercent: prev[index]?.change24hPercent || 0,
          valueUSD,
          name: data.token.name,
          ticker: data.token.ticker,
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
            c.ticker.toUpperCase() + 'USDT' === data.instId
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

    // Update ordre
    eventSource.addEventListener('order', (event) => {
      const data = JSON.parse((event as MessageEvent).data);
      console.log('order', data);
      setCoins((prev) =>
        prev.map((c) =>
          c.tokenId === data.tokenId
            ? { ...c, orderQuantity: data.orderQuantity }
            : c
        )
      );
    });

    eventSource.onerror = (err) => {
      console.error('SSE error', err);
      eventSource.close();
    };

    return () => eventSource.close();
  }, []);

  return {
    coins,
    totalValue,
    totalEarnValue,
    totalFrozenValue,
    totalAvailableValue,
  };
}
