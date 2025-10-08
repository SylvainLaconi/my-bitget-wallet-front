import {
  useWalletStream,
  type FormattedWalletCoin,
} from '../hooks/use-wallet-stream';
import TokenListItem from '../components/token-list-item';
import { useState } from 'react';
import DashboardSorter from '../components/dashboard-sorter';
import DashboardSummary from '../components/dashboard-summary';

type SortType = keyof FormattedWalletCoin;

type SortOrder = 'asc' | 'desc';

export default function DashboardPage() {
  const [sortType, setSortType] = useState<SortType>('ticker');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const {
    coins,
    totalValue,
    totalEarnValue,
    totalFrozenValue,
    totalAvailableValue,
  } = useWalletStream();

  if (coins.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <DashboardSummary
        totalValue={totalValue}
        totalEarnValue={totalEarnValue}
        totalFrozenValue={totalFrozenValue}
        totalAvailableValue={totalAvailableValue}
      />

      <DashboardSorter setSortType={setSortType} setSortOrder={setSortOrder} />

      <div className="flex flex-col gap-0 w-full md:pr-4">
        {coins
          .sort((a, b) => {
            const aValue = a[sortType];
            const bValue = b[sortType];

            if (typeof aValue === 'number' && typeof bValue === 'number') {
              return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
            }

            if (typeof aValue === 'string' && typeof bValue === 'string') {
              return sortOrder === 'asc'
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
            }

            return 0;
          })
          .map((coin) => (
            <TokenListItem key={coin.tokenId} coin={coin} />
          ))}
      </div>
    </div>
  );
}
