import { useWalletStream } from '../hooks/use-wallet-stream';

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
            className="flex items-center gap-4 w-full border-b border-border py-2"
          >
            <p className="text-sm">{coin.token.name}</p>
            <p className="text-sm">{coin.available}</p>
            <p className="text-sm">{coin.frozen}</p>
            <p className="text-sm">{coin.locked}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
