import { useWalletStream } from '../hooks/use-wallet-stream';
import TokenListItem from '../components/token-list-item';

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
          <TokenListItem key={coin.tokenId} coin={coin} />
        ))}
      </div>
    </div>
  );
}
