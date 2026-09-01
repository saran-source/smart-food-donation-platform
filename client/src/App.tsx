import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { CreateDonationPage } from './pages/CreateDonationPage';
import { DonorDashboardPage } from './pages/DonorDashboardPage';
import { NGODashboardPage } from './pages/NGODashboardPage';
import { NearbyDonationsPage } from './pages/NearbyDonationsPage';
import { VolunteerDashboardPage } from './pages/VolunteerDashboardPage';
import { RecipientDashboardPage } from './pages/RecipientDashboardPage';
import { RequestFoodPage } from './pages/RequestFoodPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { ProtectedRoute } from './components/ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/donor" element={<ProtectedRoute allowedRoles={['DONOR']}><DonorDashboardPage /></ProtectedRoute>} />
      <Route path="/ngo" element={<ProtectedRoute allowedRoles={['NGO']}><NGODashboardPage /></ProtectedRoute>} />
      <Route path="/nearby" element={<ProtectedRoute allowedRoles={['NGO', 'RECIPIENT']}><NearbyDonationsPage /></ProtectedRoute>} />
      <Route path="/donations/new" element={<ProtectedRoute allowedRoles={['DONOR']}><CreateDonationPage /></ProtectedRoute>} />
      <Route path="/volunteer" element={<ProtectedRoute allowedRoles={['VOLUNTEER']}><VolunteerDashboardPage /></ProtectedRoute>} />
      <Route path="/recipient" element={<ProtectedRoute allowedRoles={['RECIPIENT']}><RecipientDashboardPage /></ProtectedRoute>} />
      <Route path="/requests/new" element={<ProtectedRoute allowedRoles={['RECIPIENT']}><RequestFoodPage /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboardPage /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export function App() {
  return <AuthProvider><AppRoutes /></AuthProvider>;
}
