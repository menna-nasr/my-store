import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) { setError('Please fill in all fields.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    try {
      await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      setSuccess('Account created! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1 className="auth-title">Join Us</h1>
        <p className="auth-subtitle">Create your reader's account</p>
        {error && <div className="auth-alert error">{error}</div>}
        {success && <div className="auth-alert success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label-luxury">Full Name</label>
            <input className="form-input-luxury" type="text" placeholder="Your name"
              value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label-luxury">Email Address</label>
            <input className="form-input-luxury" type="email" placeholder="you@example.com"
              value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label-luxury">Password</label>
            <input className="form-input-luxury" type="password" placeholder="Min. 6 characters"
              value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button className="btn-luxury" type="submit">Create Account</button>
        </form>
        <p className="auth-link">
          Already a member? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;