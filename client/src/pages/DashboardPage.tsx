import { logoutUser } from '../services/auth';
import { useAuth } from '../context/AuthContext';

export function DashboardPage() {
  const { profile } = useAuth();

  return (
    <section className="dashboard-card">
      <span className="eyebrow">YOUR WORKSPACE</span>
      <h1>{profile?.role ?? 'USER'} Dashboard</h1>
      <p>Welcome, {profile?.displayName ?? 'there'}. Your role-based workspace is ready for the next features.</p>
      <button onClick={() => void logoutUser()}>Sign out</button>
    </section>
  );
}
