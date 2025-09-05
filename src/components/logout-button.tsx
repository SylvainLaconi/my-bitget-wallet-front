import useLogout from '../hooks/use-logout-mutation';

export default function LogoutButton() {
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <button
      className="btn"
      onClick={handleLogout}
      disabled={logoutMutation.isPending}
    >
      {logoutMutation.isPending ? 'Se déconnecter…' : 'Se déconnecter'}
    </button>
  );
}
