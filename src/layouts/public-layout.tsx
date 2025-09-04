import { Outlet } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div className="flex flex-col h-screen w-screen px-4 py-12 gap-12">
      <header className="flex flex-col justify-center items-center gap-2">
        <img
          src="/my-bitget-wallet-logo-256x256.png"
          alt="My Bitget Spot Logo"
          className="w-24 h-24"
        />
        <h1 className="text-4xl font-bold text-primary">My Bitget Spot</h1>
        <p className="text-lg text-secondary text-center">
          Prenez le contrôle de vos performances Spot sur Bitget
        </p>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
