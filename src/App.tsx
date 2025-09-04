import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

import PrivateRoutes from './routes/private-routes';
import { PublicRoutes } from './routes/public-routes';

function App() {
  return (
    <Routes>
      <Route path="/auth/*" element={<PublicRoutes />} />
      <Route path="/app/*" element={<PrivateRoutes />} />
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
}

export default App;
