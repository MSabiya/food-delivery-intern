// src/components/CreateItem.jsx
import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function CreateItem() {
  const [form, setForm] = useState({ name: '', description: '', price: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError('');
    setSuccess('');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!form.name.trim()) return setError('Name is required');
    if (form.price === '' || isNaN(Number(form.price))) return setError('Price must be a number');

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price)
    };

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE}/api/items`, payload, {
        headers: { 'Content-Type': 'application/json' }
      });
      setSuccess(`Created item (id: ${res.data._id})`);
      setForm({ name: '', description: '', price: '' });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 640, margin: '2rem auto', padding: 16, border: '1px solid #c7c1c1ff', borderRadius: 10 ,boxShadow: '#c7aeaeff ' }}>
      <h2>Create Item</h2>

      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 6 }}>Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="e.g. Notebook"
            style={{ width: '100%', padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 6 }}>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            placeholder="Optional description"
            style={{ width: '100%', padding: 8, minHeight: 80 }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 6 }}>Price *</label>
          <input
            name="price"
            value={form.price}
            onChange={onChange}
            placeholder="e.g. 199"
            style={{ width: '100%', padding: 8 }}
          />
        </div>

        {error && <div style={{ color: 'crimson', marginBottom: 12 }}>{error}</div>}
        {success && <div style={{ color: 'green', marginBottom: 12 }}>{success}</div>}

        {/* <button type="submit" disabled={loading} style={{ padding: '8px 16px ' }}>
          {loading ? 'Creating…' : 'Create'}
        </button> */}

        <button
  type="submit"
  disabled={loading}
  style={{
    padding: '8px 16px',
    backgroundColor: loading ? '#9ca3af' : '#4f46e5', // gray when loading, indigo when active
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: loading ? 'not-allowed' : 'pointer'
  }}
>
  {loading ? 'Creating…' : 'Create'}
</button>
      </form>
    </div>
  );
}
