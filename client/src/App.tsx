import { useState } from 'react';

const roles = [
  { name: 'Donor', description: 'Share safe surplus food with people who need it.' },
  { name: 'NGO', description: 'Find and coordinate food donations in your area.' },
  { name: 'Volunteer', description: 'Help move donations from donors to communities.' },
  { name: 'Recipient', description: 'Request food support for your community.' },
];

export function App() {
  const [selectedRole, setSelectedRole] = useState('Donor');

  return (
    <main className="app-shell">
      <section className="hero">
        <span className="eyebrow">SMART FOOD DONATION PLATFORM</span>
        <h1>Turn surplus food into meaningful meals.</h1>
        <p>
          A connected platform for donors, NGOs, volunteers, and communities to
          coordinate food donations efficiently.
        </p>
        <div className="role-grid" aria-label="Choose your role">
          {roles.map((role) => (
            <button
              className={selectedRole === role.name ? 'role-card active' : 'role-card'}
              key={role.name}
              onClick={() => setSelectedRole(role.name)}
            >
              <strong>{role.name}</strong>
              <span>{role.description}</span>
            </button>
          ))}
        </div>
        <p className="status">Selected role: <strong>{selectedRole}</strong></p>
      </section>
    </main>
  );
}
