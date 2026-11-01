import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import { getSession, saveSession } from '../../session';
import './ProfileCard.css';

// Shows the logged-in user's profile and lets them edit name / phone.
// Details are fetched from GET /api/auth/user and saved with PUT /api/auth/user;
// the session copy is used when the API cannot be reached.
function ProfileCard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(getSession());
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetch(`${API_URL}/api/auth/user`, {
      headers: { Authorization: `Bearer ${user.authtoken}`, Email: user.email },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('Unable to load profile'))))
      .then((data) => {
        const merged = { ...user, name: data.name, email: data.email, phone: data.phone, role: data.role || user.role };
        setUser(merged);
        saveSession(merged);
      })
      .catch(() => { /* API offline: keep the copy stored at login */ });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) return null;

  const startEdit = () => {
    setForm({ name: user.name, phone: user.phone });
    setMessage('');
    setError('');
    setEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) { setError('Name is required'); return; }
    if (!/^\d{10}$/.test(form.phone)) { setError('Phone number must be 10 digits'); return; }
    setError('');

    const updated = { ...user, name: form.name.trim(), phone: form.phone };
    try {
      const response = await fetch(`${API_URL}/api/auth/user`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.authtoken}`, Email: user.email },
        body: JSON.stringify({ name: updated.name, phone: updated.phone }),
      });
      if (!response.ok) throw new Error('Update failed');
    } catch {
      // Keep the local copy even if the API is unavailable.
    }
    saveSession(updated);
    setUser(updated);
    setEditing(false);
    setMessage('Profile updated successfully.');
  };

  const initials = user.name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="profile-page">
      <div className="card profile-card">
        <div className="profile-card__head">
          <div className="profile-card__avatar" aria-hidden="true">{initials}</div>
          <div>
            <h1 style={{ fontSize: '1.4rem', color: 'var(--primary-dark)' }}>Welcome, {user.name}</h1>
            <p className="helper-text">{user.role}</p>
          </div>
        </div>

        {message && <div className="form-alert form-alert--success">{message}</div>}

        {editing ? (
          <form onSubmit={handleSave} noValidate>
            <div className="form-group">
              <label htmlFor="pf-email">Email</label>
              <input id="pf-email" type="email" className="form-control" value={user.email} disabled />
            </div>
            <div className="form-group">
              <label htmlFor="pf-name">Name</label>
              <input id="pf-name" type="text" className="form-control" value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
            </div>
            <div className="form-group">
              <label htmlFor="pf-phone">Phone</label>
              <input id="pf-phone" type="tel" className="form-control" value={form.phone} maxLength={10}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} required />
            </div>
            {error && <div className="error-text" style={{ marginBottom: '0.75rem' }}>{error}</div>}
            <div className="profile-card__actions">
              <button type="submit" className="btn">Save</button>
              <button type="button" className="btn btn-outline" onClick={() => setEditing(false)}>Cancel</button>
            </div>
          </form>
        ) : (
          <>
            <dl>
              <dt>Name</dt><dd>{user.name}</dd>
              <dt>Email</dt><dd>{user.email}</dd>
              <dt>Phone</dt><dd>{user.phone || '—'}</dd>
              <dt>Role</dt><dd>{user.role}</dd>
            </dl>
            <div className="profile-card__actions">
              <button type="button" className="btn" onClick={startEdit}>Edit</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileCard;
