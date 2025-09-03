import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/login.page'
import PrivateRoute from './routes/private-route'
import DashboardPage from './pages/dashboard.page'

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </>
  )
}

export default App
