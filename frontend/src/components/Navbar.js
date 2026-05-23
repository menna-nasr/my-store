import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCartKey, getCurrentUser } from '../utils/auth';

function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const updateCart = () => {
    const cart = JSON.parse(localStorage.getItem(getCartKey()) || '[]');
    setCartCount(cart.length);
    setUser(getCurrentUser());
  };

  useEffect(() => {
    updateCart();
    window.addEventListener('cartUpdated', updateCart);
    return () => window.removeEventListener('cartUpdated', updateCart);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setCartCount(0);
    navigate('/login');
  };

  return (
    <nav className="navbar-custom">
      <Link to="/" className="nav-brand">📚 Libreria</Link>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        {user ? (
          <>
            <li><span style={{ color: 'var(--gold)', fontSize: '0.85rem' }}>👤 {user.name}</span></li>
            <li><button onClick={handleLogout} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--cream-dim)', padding: '0.3rem 0.8rem', cursor: 'pointer', fontFamily: 'Lora, serif', fontSize: '0.85rem' }}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
        <li>
          <Link to="/cart">
            Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;