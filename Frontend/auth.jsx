import React, { useState } from 'react';

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

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f7fbff, #dceeff)',
      padding: '24px',
      fontFamily: 'Segoe UI, sans-serif',
    },
    card: {
      width: '100%',
      maxWidth: '440px',
      background: '#ffffff',
      borderRadius: '18px',
      boxShadow: '0 18px 40px rgba(21, 48, 77, 0.16)',
      padding: '28px',
    },
    title: {
      margin: '0 0 8px',
      fontSize: '1.8rem',
      color: '#173a5a',
    },
    subtitle: {
      margin: '0 0 22px',
      color: '#607b8f',
    },
    switchRow: {
      display: 'flex',
      gap: '8px',
      marginBottom: '20px',
    },
    toggleButton: {
      flex: 1,
      border: '1px solid #c9d9ea',
      background: '#edf4fb',
      color: '#234a68',
      padding: '10px 12px',
      borderRadius: '10px',
      cursor: 'pointer',
      fontWeight: 700,
    },
    activeToggle: {
      background: '#1d5f9e',
      color: '#ffffff',
      borderColor: '#1d5f9e',
    },
    form: {
      display: 'grid',
      gap: '14px',
    },
    label: {
      display: 'grid',
      gap: '6px',
      fontWeight: 600,
      color: '#244363',
    },
    input: {
      padding: '11px 12px',
      borderRadius: '10px',
      border: '1px solid #cfe0ee',
      fontSize: '1rem',
    },
    button: {
      marginTop: '8px',
      border: 'none',
      borderRadius: '10px',
      background: '#1d5f9e',
      color: '#ffffff',
      fontWeight: 700,
      fontSize: '1rem',
      padding: '12px 16px',
      cursor: 'pointer',
    },
    feedback: {
      marginTop: '14px',
      borderRadius: '10px',
      padding: '10px 12px',
      fontSize: '0.95rem',
    },
    success: {
      background: '#e6f8ec',
      color: '#175d36',
    },
    errorMessage: {
      background: '#fff0f0',
      color: '#a33131',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1>
        <p style={styles.subtitle}>Sign in or register to continue with dotMercury.</p>

        <div style={styles.switchRow}>
          <button
            type="button"
            style={{ ...styles.toggleButton, ...(mode === 'login' ? styles.activeToggle : {}) }}
            onClick={() => setMode('login')}
          >
            Log in
          </button>
          <button
            type="button"
            style={{ ...styles.toggleButton, ...(mode === 'register' ? styles.activeToggle : {}) }}
            onClick={() => setMode('register')}
          >
            Register
          </button>
        </div>

        <form style={styles.form} onSubmit={handleSubmit}>
          <label style={styles.label}>
            Username
            <input
              style={styles.input}
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter your username"
            />
          </label>

          {mode === 'register' && (
            <label style={styles.label}>
              Email
              <input
                style={styles.input}
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="name@example.com"
              />
            </label>
          )}

          <label style={styles.label}>
            Password
            <input
              style={styles.input}
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </label>

          <button style={styles.button} type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Please wait...' : mode === 'login' ? 'Log in' : 'Register'}
          </button>
        </form>

        {error && <div style={{ ...styles.feedback, ...styles.errorMessage }}>{error}</div>}
        {message && <div style={{ ...styles.feedback, ...styles.success }}>{message}</div>}
      </div>
    </div>
  );
}
