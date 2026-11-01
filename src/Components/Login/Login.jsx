import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import { saveSession } from '../../session';
import '../Sign_Up/Sign_Up.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const next = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter a valid email address';
    if (!password) next.password = 'Password is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // Calls the login authentication API: POST /api/auth/login
  const login = async () => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.errors?.[0]?.msg || json.error || 'Login failed');
    }
    return json;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;

    setSubmitting(true);
    try {
      const json = await login();
      saveSession({
        authtoken: json.authtoken,
        name: json.name,
        email: json.email || email.trim().toLowerCase(),
        phone: json.phone,
        role: json.role,
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
    setEmail('');
    setPassword('');
    setErrors({});
    setApiError('');
  };

  return (
    <div className="auth-page">
      <form className="card auth-card" onSubmit={handleSubmit} noValidate>
        <h1>Login</h1>
        <p className="helper-text">
          Are you a new member? <Link to="/signup">Sign Up Here</Link>
        </p>

        {apiError && <div className="form-alert form-alert--error" role="alert">{apiError}</div>}

        <div className="form-group">
          <label htmlFor="login-email">Email</label>
          <input id="login-email" name="email" type="email" className="form-control" placeholder="Enter your email"
            value={email} onChange={(e) => { setEmail(e.target.value); setErrors((er) => ({ ...er, email: '' })); }} required />
          {errors.email && <div className="error-text">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="login-password">Password</label>
          <input id="login-password" name="password" type="password" className="form-control" placeholder="Enter your password"
            value={password} onChange={(e) => { setPassword(e.target.value); setErrors((er) => ({ ...er, password: '' })); }} required />
          {errors.password && <div className="error-text">{errors.password}</div>}
        </div>

        <div className="auth-actions">
          <button type="submit" className="btn" disabled={submitting}>{submitting ? 'Logging in...' : 'Login'}</button>
          <button type="button" className="btn btn-outline" onClick={handleReset}>Reset</button>
        </div>
        <p className="helper-text" style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Link to="/login">Forgot Password?</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
