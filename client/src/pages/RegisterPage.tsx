import { FormEvent, useState } from 'react';
import { registerUser } from '../services/auth';
import { USER_ROLES, type UserRole } from '../types/user';

export function RegisterPage() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('DONOR');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await registerUser(email, password, displayName, role);
    } catch {
      setError('Unable to create your account. Check the details and try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="auth-card">
      <span className="eyebrow">JOIN THE PLATFORM</span>
      <h1>Create account</h1>
      <p>Choose your role and start making a difference.</p>
      <form onSubmit={handleSubmit} className="auth-form">
        <label>Name<input value={displayName} onChange={(e) => setDisplayName(e.target.value)} required /></label>
        <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
        <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} /></label>
        <label>Role<select value={role} onChange={(e) => setRole(e.target.value as UserRole)}>{USER_ROLES.filter((item) => item !== 'ADMIN').map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        {error && <p className="form-error">{error}</p>}
        <button type="submit" disabled={submitting}>{submitting ? 'Creating…' : 'Create account'}</button>
      </form>
    </section>
  );
}
