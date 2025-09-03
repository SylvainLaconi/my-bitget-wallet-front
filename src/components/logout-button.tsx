import { useNavigate } from 'react-router-dom';
import { useMe } from '../contexts/me-context';

export default function LogoutButton() {
  const { logout } = useMe();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <button className="btn" onClick={handleLogout}>
      Se déconnecter
    </button>
  );
}
