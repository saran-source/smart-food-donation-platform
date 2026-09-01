import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createFoodRequest } from '../services/requests';

export function RequestFoodPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [foodType, setFoodType] = useState('Prepared meals');
  const [quantity, setQuantity] = useState(10);
  const [unit, setUnit] = useState<'MEALS' | 'KG' | 'PACKETS' | 'BOXES'>('MEALS');
  const [neededBy, setNeededBy] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!user) return;
    setSaving(true);
    setError('');
    try {
      await createFoodRequest({
        requesterId: user.uid,
        foodType,
        quantity,
        unit,
        neededBy,
        deliveryAddress: address,
        latitude: 13.0827,
        longitude: 80.2707,
      });
      navigate('/recipient');
    } catch {
      setError('Unable to create the request. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="form-page">
      <Link to="/recipient">← Back</Link>
      <section className="auth-card">
        <span className="eyebrow">FOOD SUPPORT</span>
        <h1>Create a food request</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>Food type<input value={foodType} onChange={(e) => setFoodType(e.target.value)} required /></label>
          <label>Quantity<input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} required /></label>
          <label>Unit<select value={unit} onChange={(e) => setUnit(e.target.value as typeof unit)}><option>MEALS</option><option>KG</option><option>PACKETS</option><option>BOXES</option></select></label>
          <label>Needed by<input type="datetime-local" value={neededBy} onChange={(e) => setNeededBy(e.target.value)} required /></label>
          <label>Delivery address<textarea value={address} onChange={(e) => setAddress(e.target.value)} required /></label>
          {error && <p className="form-error">{error}</p>}
          <button disabled={saving}>{saving ? 'Submitting…' : 'Submit request'}</button>
        </form>
      </section>
    </main>
  );
}
