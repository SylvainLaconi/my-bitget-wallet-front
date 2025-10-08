import { type FormattedWalletCoin } from '../hooks/use-wallet-stream';
import Select from './select';

type DashboardSorterProps = {
  setSortType: (sortType: keyof FormattedWalletCoin) => void;
  setSortOrder: (sortOrder: 'asc' | 'desc') => void;
};

export default function DashboardSorter({
  setSortType,
  setSortOrder,
}: DashboardSorterProps) {
  const sortTypeOptions = [
    { value: 'name - asc', label: 'Nom A-Z' },
    { value: 'name - desc', label: 'Nom Z-A' },
    { value: 'lastPrice - asc', label: 'Prix croissant' },
    { value: 'lastPrice - desc', label: 'Prix décroissant' },
    { value: 'change24hPercent - asc', label: '24h croissant' },
    { value: 'change24hPercent - desc', label: '24h décroissant' },
    { value: 'valueUSD - asc', label: 'Valeur croissante' },
    { value: 'valueUSD - desc', label: 'Valeur décroissante' },
  ];

  const handleSortTypeChange = (value: string) => {
    const [sortType, sortOrder] = value.split(' - ');
    setSortType(sortType as keyof FormattedWalletCoin);
    setSortOrder(sortOrder as 'asc' | 'desc');
  };

  return (
    <div className="flex justify-end w-full">
      <Select
        name="sortType"
        placeholder="Trier par"
        options={sortTypeOptions}
        onChange={handleSortTypeChange}
      />
    </div>
  );
}
