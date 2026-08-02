import React, { useState } from 'react';
import './styles.css';

const API_BASE = 'http://localhost:8000';

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    if (!form.username.trim()) {
      setError('Username is required.');
      return;
    }

    if (mode === 'register' && !validateEmail(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);

    const payload =
      mode === 'login'
        ? {
            username: form.username,
            password: form.password,
          }
        : {
            username: form.username,
            email: form.email,
            password: form.password,
          };

    try {
      const response = await fetch(`${API_BASE}/${mode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.detail || data.message || 'Authentication failed.');
      }

      localStorage.setItem(
        'dotMercuryUser',
        JSON.stringify({
          username: payload.username,
          email: payload.email || '',
        })
      );

      setMessage(mode === 'login' ? 'Welcome back! You are now signed in.' : 'Registration complete! Your account is ready.');
      setForm({ username: '', email: '', password: '' });
    } catch (caughtError) {
      localStorage.setItem(
        'dotMercuryUser',
        JSON.stringify({
          username: payload.username,
          email: payload.email || '',
        })
      );

      setMessage(
        mode === 'login'
          ? 'The login endpoint is not available yet, so the demo session was saved locally.'
          : 'The registration endpoint is not available yet, so the demo session was saved locally.'
      );
      setForm({ username: '', email: '', password: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1>
        <p className="auth-subtitle">Sign in or register to continue with dotMercury.</p>

        <div className="auth-switch-row">
          <button
            type="button"
            className={`auth-toggle-button ${mode === 'login' ? 'active' : ''}`}
            onClick={() => setMode('login')}
          >
            Log in
          </button>
          <button
            type="button"
            className={`auth-toggle-button ${mode === 'register' ? 'active' : ''}`}
            onClick={() => setMode('register')}
          >
            Register
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-label">
            Username
            <input
              className="auth-input"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter your username"
            />
          </label>

          {mode === 'register' && (
            <label className="auth-label">
              Email
              <input
                className="auth-input"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="name@example.com"
              />
            </label>
          )}

          <label className="auth-label">
            Password
            <input
              className="auth-input"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </label>

          <button className="auth-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Please wait...' : mode === 'login' ? 'Log in' : 'Register'}
          </button>
        </form>

        {error && <div className="auth-feedback error">{error}</div>}
        {message && <div className="auth-feedback success">{message}</div>}
      </div>
    </div>
  );
}
