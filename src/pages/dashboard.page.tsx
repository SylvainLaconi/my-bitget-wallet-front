import { useWalletStream } from '../hooks/use-wallet-stream';
import { formatPrice } from '../utils/formatPrice';
import { cn } from '../utils/cn';

export default function DashboardPage() {
  const coins = useWalletStream();

  if (coins.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex flex-col gap-0 w-full">
        {coins.map((coin) => (
          <div
            key={coin.tokenId}
            className="flex items-center justify-between gap-4 w-full border-b border-border py-2"
          >
            <div className="flex items-center gap-4 w-1/3">
              <img
                src={
                  `/icon/${coin.token.ticker.toLowerCase()}.png` ||
                  '/icon/default.png'
                }
                alt={coin.token.name}
                className="w-8 h-8"
              />

              <p className="text-sm">{coin.token.ticker}</p>
              <div>
                <p className="text-sm">{`$${formatPrice(8, coin.lastPrice)}`}</p>
                <p
                  className={cn(
                    coin.change24hPercent && coin.change24hPercent > 0
                      ? 'text-green-500'
                      : 'text-red-500'
                  )}
                >{`${coin.change24hPercent && coin.change24hPercent > 0 ? '+' : ''}${coin.change24hPercent?.toFixed(2)}%`}</p>
              </div>
            </div>

            <p className="text-sm">{coin.available.toFixed(8)}</p>
            <p className="text-sm">{coin.earnQuantity?.toFixed(8)}</p>
            <p className="text-sm">
              {(coin.available + coin.earnQuantity).toFixed(8)}
            </p>
            <p className="text-sm">{`$${coin.valueUSD?.toFixed(2)}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
