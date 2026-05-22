import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setSuccess('Welcome back! Redirecting...');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Sign in to your library account</p>
        {error && <div className="auth-alert error">{error}</div>}
        {success && <div className="auth-alert success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label-luxury">Email Address</label>
            <input className="form-input-luxury" type="email" placeholder="you@example.com"
              value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label-luxury">Password</label>
            <input className="form-input-luxury" type="password" placeholder="••••••••"
              value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button className="btn-luxury" type="submit">Enter the Library</button>
        </form>
        <p className="auth-link">
          New reader? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;