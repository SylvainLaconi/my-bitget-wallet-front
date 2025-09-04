import { Routes, Route, Navigate } from 'react-router-dom';
import { useMeQuery } from '../hooks/use-me-query';

import DashboardPage from '../pages/dashboard.page';
// ajoute ici tes autres pages privées

function PrivateRoutes() {
  const { data: me, isLoading } = useMeQuery();

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
