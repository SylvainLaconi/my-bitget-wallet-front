import { cn } from '../utils/cn';
import { formatPrice } from '../utils/formatPrice';

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

type TokenListItemProps = {
  coin: WalletCoin;
};

export default function TokenListItem({ coin }: TokenListItemProps) {
  return (
    <div className="flex items-center justify-between gap-4 w-full border-b border-border py-4">
      <div className="flex items-center gap-8 w-1/6">
        <div className="flex items-center gap-4">
          <img
            src={`/icon/${coin.token.ticker.toLowerCase()}.png`}
            alt={coin.token.name}
            className="w-8 h-8"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/icon/default.png';
            }}
          />
          <p className="text-sm w-16">{coin.token.ticker}</p>
        </div>

        <div className="flex flex-col items-end gap-2 w-16">
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

      <p className="text-sm w-28 text-right border-b border-border">
        {coin.available.toFixed(8)}
      </p>
      <p className="text-sm w-28 text-right border-b border-border  ">
        {coin.earnQuantity?.toFixed(8)}
      </p>
      <p className="text-sm">
        {(coin.available + coin.earnQuantity).toFixed(8)}
      </p>
      <p className="text-sm">{`$${coin.valueUSD?.toFixed(2)}`}</p>
    </div>
  );
}
