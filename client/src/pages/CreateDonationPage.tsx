import { FormEvent, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createDonation } from '../services/donations';
import { FOOD_TYPES, type FoodType } from '../types/donation';

const initialForm = {
  title: '', description: '', foodType: 'VEGETARIAN' as FoodType,
  quantity: '1', unit: 'MEALS' as const, preparedAt: '', expiresAt: '',
  pickupStart: '', pickupEnd: '', address: '', latitude: '', longitude: '',
};

export function CreateDonationPage() {
  const { user } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function update(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!user) return;
    setSubmitting(true);
    setMessage('');

    try {
      await createDonation({
        donorId: user.uid,
        title: form.title.trim(),
        description: form.description.trim(),
        foodType: form.foodType,
        quantity: Number(form.quantity),
        unit: form.unit,
        preparedAt: form.preparedAt,
        expiresAt: form.expiresAt,
        pickupStart: form.pickupStart,
        pickupEnd: form.pickupEnd,
        location: {
          address: form.address.trim(),
          latitude: Number(form.latitude),
          longitude: Number(form.longitude),
        },
      });
      setForm(initialForm);
      setMessage('Donation created successfully.');
    } catch {
      setMessage('Could not create the donation. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="form-card">
      <span className="eyebrow">FOOD DONATION</span>
      <h1>Create a donation</h1>
      <p>Provide enough information for an NGO or volunteer to arrange pickup safely.</p>
      <form className="donation-form" onSubmit={handleSubmit}>
        <label>Food title<input value={form.title} onChange={(e) => update('title', e.target.value)} placeholder="e.g. 50 vegetarian meal boxes" required /></label>
        <label>Description<textarea value={form.description} onChange={(e) => update('description', e.target.value)} placeholder="Describe the food and packaging." required /></label>
        <div className="form-grid">
          <label>Food type<select value={form.foodType} onChange={(e) => update('foodType', e.target.value)}>{FOOD_TYPES.map((type) => <option key={type}>{type}</option>)}</select></label>
          <label>Quantity<input type="number" min="1" value={form.quantity} onChange={(e) => update('quantity', e.target.value)} required /></label>
          <label>Unit<select value={form.unit} onChange={(e) => update('unit', e.target.value)}><option>MEALS</option><option>KG</option><option>PACKETS</option><option>BOXES</option></select></label>
        </div>
        <div className="form-grid">
          <label>Prepared at<input type="datetime-local" value={form.preparedAt} onChange={(e) => update('preparedAt', e.target.value)} required /></label>
          <label>Expires at<input type="datetime-local" value={form.expiresAt} onChange={(e) => update('expiresAt', e.target.value)} required /></label>
        </div>
        <div className="form-grid">
          <label>Pickup starts<input type="datetime-local" value={form.pickupStart} onChange={(e) => update('pickupStart', e.target.value)} required /></label>
          <label>Pickup ends<input type="datetime-local" value={form.pickupEnd} onChange={(e) => update('pickupEnd', e.target.value)} required /></label>
        </div>
        <label>Pickup address<input value={form.address} onChange={(e) => update('address', e.target.value)} placeholder="Full pickup address" required /></label>
        <div className="form-grid">
          <label>Latitude<input type="number" step="any" value={form.latitude} onChange={(e) => update('latitude', e.target.value)} required /></label>
          <label>Longitude<input type="number" step="any" value={form.longitude} onChange={(e) => update('longitude', e.target.value)} required /></label>
        </div>
        {message && <p className="form-message">{message}</p>}
        <button type="submit" disabled={submitting}>{submitting ? 'Creating…' : 'Publish donation'}</button>
      </form>
    </section>
  );
}
