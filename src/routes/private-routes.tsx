import { Routes, Route, Navigate } from 'react-router-dom';

import DashboardPage from '../pages/dashboard.page';
import useMe from '../hooks/use-me-query';

function PrivateRoutes() {
  const { data: me, isLoading } = useMe();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!me) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <Routes>
      <Route path="dashboard" element={<DashboardPage />} />
      {/* autres routes privées */}
    </Routes>
  );
}

export default PrivateRoutes;
