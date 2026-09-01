import { FormEvent, useState } from 'react';
import { loginUser } from '../services/auth';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await loginUser(email, password);
    } catch {
      setError('Unable to sign in. Check your email and password.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="auth-card">
      <span className="eyebrow">WELCOME BACK</span>
      <h1>Sign in</h1>
      <p>Access your food donation workspace.</p>
      <form onSubmit={handleSubmit} className="auth-form">
        <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
        <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} /></label>
        {error && <p className="form-error">{error}</p>}
        <button type="submit" disabled={submitting}>{submitting ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </section>
  );
}
