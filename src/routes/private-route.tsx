import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useMe } from '../contexts/me-context';

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const { me, isLoading } = useMe();

  useEffect(() => {
    if (!me && !isLoading) {
      navigate('/login');
    }
  }, [me, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <>{children}</>;
}
