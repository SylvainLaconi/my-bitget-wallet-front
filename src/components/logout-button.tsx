import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { logout } from '../api/auth';

export default function LogoutButton() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    queryClient.setQueryData(['me'], null);
    queryClient.invalidateQueries({ queryKey: ['me'] });

    navigate('/auth/login', { replace: true });
  };

  return (
    <button className="btn" onClick={handleLogout}>
      Se déconnecter
    </button>
  );
}
