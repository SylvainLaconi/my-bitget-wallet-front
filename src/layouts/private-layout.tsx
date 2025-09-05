import { Outlet } from 'react-router-dom';
import LogoutButton from '../components/logout-button';

export default function PrivateLayout() {
  return (
    <div className="flex flex-col h-screen w-screen px-4 pb-12 pt-20 gap-12 relative">
      <header className="fixed top-0 left-0 right-0 px-4 py-4 flex justify-between items-center bg-background">
        <div className="flex items-center gap-1">
          <img
            src="/my-bitget-wallet-logo-48x48.png"
            alt="My Bitget Spot Logo"
            className="w-10 h-10"
          />
          <h1 className="text-xl font-bold text-primary">My Bitget Spot</h1>
        </div>
        <div className="flex items-center gap-2">
          <LogoutButton />
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
