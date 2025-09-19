import useLogout from '../hooks/use-logout-mutation';
import Button from './button';
import { FaSignOutAlt } from 'react-icons/fa';

export default function LogoutButton() {
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <Button
      onClick={handleLogout}
      isLoading={logoutMutation.isPending}
      size="small"
      variant="secondary"
      icon={<FaSignOutAlt />}
    >
      Déconnexion
    </Button>
  );
}
