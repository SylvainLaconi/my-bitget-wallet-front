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
    <div className="flex items-start md:items-center justify-between w-full border-b border-border py-2 md:py-4">
      <div className="flex flex-col items-start md:flex-row md:items-center gap-1 md:gap-8 w-1/5 ">
        <div className="flex items-center gap-1 md:gap-2">
          <img
            src={`/icon/${coin.token.ticker.toLowerCase()}.png`}
            alt={coin.token.name}
            className="w-4 h-4 md:w-8 md:h-8"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/icon/default.png';
            }}
          />
          <span className="text-sm md:text-base font-bold md:w-20">
            {coin.token.ticker}
          </span>
        </div>

        <div className="flex flex-col items-start gap-1">
          <span className="text-sm md:text-base">
            {`$${formatPrice(8, coin.lastPrice)}`}
          </span>
          <span
            className={cn(
              'font-bold text-sm md:text-base',
              coin.change24hPercent && coin.change24hPercent > 0
                ? 'text-green-500'
                : 'text-red-500'
            )}
          >{`${coin.change24hPercent && coin.change24hPercent > 0 ? '+' : ''}${coin.change24hPercent?.toFixed(2)}%`}</span>
        </div>
      </div>

      <div className="flex flex-col items-start md:flex-row md:items-center gap-1 md:gap-8 w-2/5">
        <div className="flex flex-row items-center justify-between w-full md:flex-col gap-1">
          <span className="text-xs md:text-sm text-text-secondary md:text-right w-full">
            Disponible
          </span>
          <span className="text-sm md:text-base text-right w-full">
            {formatPrice(8, coin.available)}
          </span>
        </div>
        <div className="flex flex-row items-center justify-between w-full md:flex-col gap-1">
          <span className="text-xs md:text-sm text-text-secondary md:text-right w-full">
            Épargne
          </span>
          <span className="text-sm md:text-base text-right w-full">
            {formatPrice(8, coin.earnQuantity)}
          </span>
        </div>

        <div className="flex flex-row items-center justify-between w-full md:flex-col gap-1">
          <span className="text-xs md:text-sm text-text-secondary md:text-right w-full">
            Total
          </span>
          <span className="text-sm md:text-base text-right w-full font-bold">
            {formatPrice(8, coin.available + coin.earnQuantity)}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-end gap-0.5 md:gap-1 w-2/5">
        <span className="text-xs md:text-sm text-text-secondary w-full text-right">
          Valeur
        </span>
        <span className="text-base font-bold w-full text-right">{`$${coin.valueUSD?.toFixed(2)}`}</span>
      </div>
    </div>
  );
}
