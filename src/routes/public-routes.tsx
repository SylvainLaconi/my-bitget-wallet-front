import { Routes, Route } from 'react-router-dom';

import LoginPage from '../pages/login.page';
import RegisterPage from '../pages/register.page';
import PublicLayout from '../layouts/public-layout';

export function PublicRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        {/* autres routes publiques sous /auth/* */}
      </Route>
    </Routes>
  );
}
