import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import { saveSession } from '../../session';
import './Sign_Up.css';

const initialForm = { role: 'Patient', name: '', phone: '', email: '', password: '' };

function Sign_Up() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((err) => ({ ...err, [name]: '' }));
  };

  // Client-side validation so obviously wrong input never reaches the API.
  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!/^\d{10}$/.test(form.phone)) next.phone = 'Phone number must be exactly 10 digits';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address';
    if (form.password.length < 6) next.password = 'Password must be at least 6 characters';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // Calls the registration API: POST /api/auth/register
  const register = async () => {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        phone: form.phone,
        role: form.role,
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.errors?.[0]?.msg || json.error || 'Registration failed');
    }
    return json;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;

    setSubmitting(true);
    try {
      const json = await register();
      // Store the token and user details so the Navbar can greet the user.
      saveSession({
        authtoken: json.authtoken,
        name: json.name || form.name.trim(),
        email: json.email || form.email.trim().toLowerCase(),
        phone: json.phone || form.phone,
        role: json.role || form.role,
      });
      navigate('/');
    } catch (err) {
      setApiError(err.message === 'Failed to fetch'
        ? `Cannot reach the StayHealthy API at ${API_URL}. Start the server (npm run server) and try again.`
        : err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
    setApiError('');
  };

  return (
    <div className="auth-page">
      <form className="card auth-card" onSubmit={handleSubmit} noValidate>
        <h1>Sign Up</h1>
        <p className="helper-text">
          Already a member? <Link to="/login">Login</Link>
        </p>

        {apiError && <div className="form-alert form-alert--error" role="alert">{apiError}</div>}

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select id="role" name="role" className="form-control" value={form.role} onChange={handleChange} required>
            <option value="Patient">Patient</option>
            <option value="Doctor">Doctor</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" className="form-control" placeholder="Enter your name"
            value={form.name} onChange={handleChange} aria-describedby="name-error" required />
          {errors.name && <div id="name-error" className="error-text">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" className="form-control" placeholder="Enter your 10-digit phone number"
            value={form.phone} onChange={handleChange} maxLength={10} aria-describedby="phone-error" required />
          {errors.phone && <div id="phone-error" className="error-text">{errors.phone}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" className="form-control" placeholder="Enter your email"
            value={form.email} onChange={handleChange} aria-describedby="email-error" required />
          {errors.email && <div id="email-error" className="error-text">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" className="form-control" placeholder="Enter your password"
            value={form.password} onChange={handleChange} aria-describedby="password-error" required />
          {errors.password && <div id="password-error" className="error-text">{errors.password}</div>}
        </div>

        <div className="auth-actions">
          <button type="submit" className="btn" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit'}</button>
          <button type="button" className="btn btn-outline" onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  );
}

export default Sign_Up;
